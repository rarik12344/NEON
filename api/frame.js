export default async function handler(req, res) {
  try {
    // Устанавливаем правильные заголовки
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('X-Frame-Options', 'ALLOW-FROM https://warpcast.com');
    
    // Оптимизированное изображение (рекомендуемый размер 1200x630px)
    const imageUrl = 'https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg';
    
    // Полный HTML для фрейма
    const frameHtml = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
  <!-- Обязательные мета-теги для Farcaster Frame -->
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="${imageUrl}">
  <meta property="fc:frame:button:1" content="🎫 Participate">
  <meta property="fc:frame:post_url" content="https://${req.headers.host}/api/frame">
  
  <!-- Open Graph для совместимости -->
  <meta property="og:title" content="Neon Lottery">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  
  <!-- Контент для браузера -->
  <title>Neon Lottery | Daily ETH Lottery</title>
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      background: #0f0f1a;
      color: white;
      text-align: center;
      padding: 2rem;
      margin: 0;
    }
    img {
      max-width: 100%;
      border-radius: 12px;
      margin-top: 1rem;
    }
  </style>
</head>
<body>
  <h1>✨ Neon Lottery ✨</h1>
  <p>Daily ETH lottery on Base Network</p>
  <img src="${imageUrl}" alt="Neon Lottery Banner">
  <p>Open in Warpcast to participate</p>
</body>
</html>`;

    return res.status(200).send(frameHtml);
  } catch (error) {
    console.error('Frame generation error:', error);
    return res.status(500).send('Internal Server Error');
  }
}
