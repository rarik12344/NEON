import { createCanvas, registerFont } from 'canvas';
import path from 'path';

// Register fonts (make sure fonts are in your project)
registerFont(path.resolve('./fonts/Poppins-Bold.ttf'), { family: 'Poppins', weight: 'bold' });
registerFont(path.resolve('./fonts/SpaceGrotesk-Bold.ttf'), { family: 'Space Grotesk', weight: 'bold' });

const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 628;

export default async function handler(req, res) {
  try {
    const { type = 'default', state = '' } = req.query;
    
    // Create canvas
    const canvas = createCanvas(IMAGE_WIDTH, IMAGE_HEIGHT);
    const ctx = canvas.getContext('2d');
    
    // Draw background
    ctx.fillStyle = '#0f0f1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(0, 243, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 0, 255, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw content based on type
    switch(type) {
      case 'buy':
        drawBuyFrame(ctx, canvas.width, canvas.height, state);
        break;
      case 'winners':
        drawWinnersFrame(ctx, canvas.width, canvas.height, state);
        break;
      case 'info':
        drawInfoFrame(ctx, canvas.width, canvas.height, state);
        break;
      default:
        drawDefaultFrame(ctx, canvas.width, canvas.height, state);
    }
    
    // Set content type and send image
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(canvas.toBuffer());
  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).send('Error generating image');
  }
}

function drawDefaultFrame(ctx, width, height) {
  // Draw title
  ctx.fillStyle = '#00f3ff';
  ctx.font = 'bold 72px "Space Grotesk"';
  ctx.textAlign = 'center';
  ctx.fillText('NEON LOTTERY', width/2, 150);
  
  // Draw subtitle
  ctx.fillStyle = '#ffffff';
  ctx.font = '36px "Poppins"';
  ctx.fillText('Daily ETH Lottery on Base', width/2, 220);
  
  // Draw CTA
  ctx.fillStyle = '#ff00ff';
  ctx.font = 'bold 48px "Space Grotesk"';
  ctx.fillText('Click to Play!', width/2, 400);
}

function drawBuyFrame(ctx, width, height) {
  // Background
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(100, 100, width-200, height-200);
  
  // Title
  ctx.fillStyle = '#00f3ff';
  ctx.font = 'bold 60px "Space Grotesk"';
  ctx.fillText('BUY TICKETS', width/2, 180);
  
  // Price
  ctx.fillStyle = '#ffffff';
  ctx.font = '36px "Poppins"';
  ctx.fillText('0.0005 ETH per ticket', width/2, 280);
  
  // Button hint
  ctx.fillStyle = '#ff00ff';
  ctx.font = 'bold 36px "Space Grotesk"';
  ctx.fillText('Click below to buy', width/2, 380);
}

function drawWinnersFrame(ctx, width, height) {
  // Background
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(100, 100, width-200, height-200);
  
  // Title
  ctx.fillStyle = '#00f3ff';
  ctx.font = 'bold 60px "Space Grotesk"';
  ctx.fillText('RECENT WINNERS', width/2, 180);
  
  // Example winner
  ctx.fillStyle = '#ffffff';
  ctx.font = '28px "Poppins"';
  ctx.fillText('0x123...456 won 0.42 ETH', width/2, 280);
  
  // Button hint
  ctx.fillStyle = '#ff00ff';
  ctx.font = 'bold 36px "Space Grotesk"';
  ctx.fillText('View all winners', width/2, 380);
}

function drawInfoFrame(ctx, width, height) {
  // Background
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(100, 100, width-200, height-200);
  
  // Title
  ctx.fillStyle = '#00f3ff';
  ctx.font = 'bold 60px "Space Grotesk"';
  ctx.fillText('HOW IT WORKS', width/2, 180);
  
  // Info text
  ctx.fillStyle = '#ffffff';
  ctx.font = '24px "Poppins"';
  wrapText(ctx, 'Daily ETH lottery with transparent blockchain draws on Base Network', 
           width/2, 250, width-300, 30);
  
  // Button hint
  ctx.fillStyle = '#ff00ff';
  ctx.font = 'bold 36px "Space Grotesk"';
  ctx.fillText('Learn more', width/2, 380);
}

// Helper function to wrap text
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let testLine = '';
  let lineCount = 0;
  
  for(let n = 0; n < words.length; n++) {
    testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
      lineCount++;
    } else {
      line = testLine;
    }
  }
  
  ctx.fillText(line, x, y);
}
