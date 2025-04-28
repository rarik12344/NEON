import { createCanvas } from 'canvas';

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
  ctx.font = 'bold 72px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('NEON LOTTERY', width/2, 150);
  
  // Draw subtitle
  ctx.fillStyle = '#ffffff';
  ctx.font = '36px "Poppins", sans-serif';
  ctx.fillText('Daily ETH Lottery on Base', width/2, 220);
  
  // Draw CTA
  ctx.fillStyle = '#ff00ff';
  ctx.font = 'bold 48px "Space Grotesk", sans-serif';
  ctx.fillText('Click to Play!', width/2, 400);
}

function drawBuyFrame(ctx, width, height) {
  // ... аналогичные функции для других типов фреймов ...
}

function drawWinnersFrame(ctx, width, height) {
  // ... аналогичные функции для других типов фреймов ...
}

function drawInfoFrame(ctx, width, height) {
  // ... аналогичные функции для других типов фреймов ...
}
