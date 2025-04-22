export default (req, res) => {
  
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  
  
  res.setHeader('Content-Security-Policy', "default-src 'self'; frame-src 'none'; script-src 'none'");
  
  // Strict-Transport-Security для безопасности
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  
  const html = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
        <meta property="fc:frame:button:1" content="🎫 Participate">
        <meta property="fc:frame:post_url" content="https://${req.headers.host}/api/frame">
      </head>
      <body>
        <!-- Fallback для браузеров -->
        <h1>Neon Lottery Frame</h1>
        <img src="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg" alt="Banner">
      </body>
    </html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
};
