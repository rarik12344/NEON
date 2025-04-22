export default async (req, res) => {
  // Безопасные заголовки
  const headers = {
    'Content-Type': 'text/html',
    'Cache-Control': 'no-store, max-age=0',
    'X-Frame-Options': 'ALLOW-FROM https://warpcast.com'
  };

  // HTML для валидного фрейма
  const html = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
  <!-- Обязательные мета-теги -->
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
  <meta property="fc:frame:button:1" content="🎫 Participate">
  <meta property="fc:frame:post_url" content="https://${req.headers.host}/api/frame">
  
  <!-- Open Graph мета-теги -->
  <meta property="og:title" content="Neon Lottery">
  <meta property="og:description" content="Daily ETH lottery on Base Network">
  <meta property="og:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
  <meta property="og:url" content="https://${req.headers.host}">
  
  <!-- Минимальные стили -->
  <style>
    body { margin: 0; padding: 0; background: #0f0f1a; color: white; }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
  <img src="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg" alt="Neon Lottery">
</body>
</html>`;

  // Устанавливаем заголовки и отправляем ответ
  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  
  return res.status(200).send(html);
};
