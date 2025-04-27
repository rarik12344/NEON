import { createCanvas } from 'canvas';

export default async function handler(req, res) {
  try {
    const { date } = req.query;
    
    // Create canvas
    const canvas = createCanvas(800, 400);
    const ctx = canvas.getContext('2d');
    
    // Draw background
    ctx.fillStyle = '#0f0f1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw title
    ctx.fillStyle = '#00f3ff';
    ctx.font = 'bold 48px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('NEON LOTTERY', canvas.width/2, 80);
    
    // Draw countdown
    ctx.fillStyle = '#ff00ff';
    ctx.font = 'bold 72px Poppins';
    ctx.fillText('00:12:34', canvas.width/2, 200);
    
    // Draw pool info
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Poppins';
    ctx.fillText('Current Pool: 0.42 ETH', canvas.width/2, 280);
    
    // Set content type and send image
    res.setHeader('Content-Type', 'image/png');
    res.send(canvas.toBuffer());
  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).send('Error generating image');
  }
}
