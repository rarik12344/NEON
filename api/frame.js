export default async (req, res) => {
  const frameData = {
    imageUrl: "https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg",
    postUrl: `https://${req.headers.host}/api/frame`,
    buttons: [{ label: "🎫 Participate" }],
    version: "vNext"
  };

  const html = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
  <meta property="fc:frame" content="${frameData.version}">
  <meta property="fc:frame:image" content="${frameData.imageUrl}">
  <meta property="fc:frame:button:1" content="${frameData.buttons[0].label}">
  <meta property="fc:frame:post_url" content="${frameData.postUrl}">
  
  <meta property="og:title" content="Neon Lottery">
  <meta property="og:image" content="${frameData.imageUrl}">
  <meta name="viewport" content="width=device-width">
  
  <style>
    body { margin: 0; background: #0f0f1a; }
    img { max-width: 100%; height: auto; display: block; }
  </style>
</head>
<body>
  <img src="${frameData.imageUrl}" alt="Neon Lottery">
</body>
</html>`;

  res
    .setHeader('Content-Type', 'text/html')
    .setHeader('Cache-Control', 'no-store, max-age=0')
    .status(200)
    .send(html);
};
