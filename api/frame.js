export default async function handler(req, res) {
  
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  
  const frameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <!-- Обязательные мета-теги -->
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
        <meta property="fc:frame:button:1" content="🎫 Participate">
        <meta property="fc:frame:post_url" content="https://${req.headers.host}/api/frame">
        
        <!-- Open Graph для совместимости -->
        <meta property="og:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
        <meta property="og:title" content="Neon Lottery">
        
        <!-- Дополнительные настройки -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <!-- Fallback контент -->
        <div style="text-align: center; padding: 2rem; font-family: Arial, sans-serif;">
          <h1>Neon Lottery</h1>
          <img src="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg" 
               alt="Neon Lottery Banner" 
               style="max-width: 100%; border-radius: 8px;">
          <p>Open in Warpcast to participate in the lottery</p>
        </div>
      </body>
    </html>
  `;

  return res.status(200).send(frameHtml);
}
