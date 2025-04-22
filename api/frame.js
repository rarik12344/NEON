export default (req, res) => {
  // Разрешаем только необходимые источники
  const csp = [
    "default-src 'none'",
    "img-src https://i.ibb.co", // Разрешаем только изображения с imgbb
    "frame-src 'self'",
    "style-src 'unsafe-inline'", // Для встроенных стилей фрейма
    "connect-src 'self'"
  ].join('; ');

  res.setHeader('Content-Security-Policy', csp);
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('X-Frame-Options', 'ALLOW-FROM https://warpcast.com');

  const html = `<!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
        <meta property="fc:frame:button:1" content="🎫 Participate">
        <meta property="fc:frame:post_url" content="https://${req.headers.host}/api/frame">
        
        <!-- Fallback для браузеров -->
        <title>Neon Lottery</title>
        <meta name="viewport" content="width=device-width">
      </head>
      <body style="margin:0;background:#0f0f1a">
        <img src="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg" 
             alt="Neon Lottery" 
             style="width:100%;height:auto">
      </body>
    </html>`;

  res.status(200).end(html);
};
