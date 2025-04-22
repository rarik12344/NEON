export default async (req, res) => {
  // Устанавливаем строгие заголовки безопасности
  const securityHeaders = {
    'Content-Type': 'text/html',
    'Cache-Control': 'no-store, max-age=0',
    'X-Frame-Options': 'ALLOW-FROM https://warpcast.com',
    'Content-Security-Policy': `
      default-src 'none';
      img-src https://i.ibb.co;
      frame-src 'self' https://warpcast.com;
      style-src 'unsafe-inline';
      connect-src 'self'
    `.replace(/\n/g, '')
  };

  // HTML для валидного Mini App Embed
  const html = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
  <!-- Обязательные мета-теги для Farcaster -->
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
  <meta property="fc:frame:button:1" content="🎫 Participate">
  <meta property="fc:frame:post_url" content="https://${req.headers.host}/api/frame">

  <!-- Open Graph мета-теги для embed -->
  <meta property="og:title" content="Neon Lottery">
  <meta property="og:description" content="Daily ETH lottery on Base Network">
  <meta property="og:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
  <meta property="og:url" content="https://${req.headers.host}">
  <meta property="og:type" content="website">

  <!-- Минимальные стили -->
  <style>
    body { margin: 0; padding: 0; background: #0f0f1a; }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
  <!-- Fallback контент -->
  <img src="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg" alt="Neon Lottery">
</body>
</html>`;

  // Устанавливаем заголовки и отправляем ответ
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  
  return res.status(200).send(html);
};
