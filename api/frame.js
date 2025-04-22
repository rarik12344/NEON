export default async (req, res) => {
  const frameHtml = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
  <!-- Обязательные мета-теги для Farcaster Frame -->
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
  <meta property="fc:frame:button:1" content="🎫 Participate">
  <meta property="fc:frame:post_url" content="https://${req.headers.host}/api/frame">

  <!-- Критически важные Open Graph теги для предпросмотра -->
  <meta property="og:title" content="Neon Lottery | Daily ETH Lottery">
  <meta property="og:description" content="Win daily ETH prizes on Base Network">
  <meta property="og:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
  <meta property="og:url" content="https://${req.headers.host}">
  <meta property="og:type" content="website">

  <!-- Дополнительные мета-теги -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="fc:frame:image:aspect_ratio" content="1.91:1">
</head>
<body style="margin:0;background:#0f0f1a">
  <img src="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg" alt="Neon Lottery" style="width:100%">
</body>
</html>`;

  res
    .setHeader('Content-Type', 'text/html')
    .setHeader('Cache-Control', 'no-store, max-age=0')
    .status(200)
    .send(frameHtml);
};
