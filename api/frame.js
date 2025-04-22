export default async function handler(req, res) {
  // Безопасные заголовки CSP
  const csp = [
    "default-src 'none'",
    "img-src https://i.ibb.co",
    "frame-src 'self'",
    "style-src 'unsafe-inline'",
    "connect-src 'self'"
  ].join('; ');

  // Устанавливаем заголовки
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Security-Policy', csp);
  res.setHeader('X-Frame-Options', 'ALLOW-FROM https://warpcast.com');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  // HTML для фрейма (без JavaScript)
  const html = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
  <!-- Обязательные мета-теги -->
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
  <meta property="fc:frame:button:1" content="🎫 Participate">
  <meta property="fc:frame:post_url" content="https://${req.headers.host}/api/frame">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Neon Lottery">
  <meta property="og:description" content="Daily ETH lottery on Base Network">
  <meta property="og:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
  <meta property="og:url" content="https://${req.headers.host}">
  
  <!-- Fallback для браузера -->
  <title>Neon Lottery</title>
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
      margin: 1rem 0;
    }
  </style>
</head>
<body>
  <h1>✨ Neon Lottery ✨</h1>
  <p>Daily ETH lottery on Base Network</p>
  <img src="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg" alt="Neon Lottery">
  <p>Open in Warpcast to participate</p>
</body>
</html>`;

  return res.status(200).send(html);
}
