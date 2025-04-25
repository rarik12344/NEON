export default async (req, res) => {
  const isFrameRequest = req.headers['user-agent']?.includes('Farcaster');
  
  if (isFrameRequest) {
    return res.status(200).json({
      type: 'frame',
      version: 'vNext',
      image: {
        url: 'https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg',
        aspectRatio: '1.91:1'
      },
      buttons: [
        {
          label: '🎫 Participate',
          action: 'post_redirect'
        }
      ],
      postUrl: `https://${req.headers.host}/api/frame`,
      metadata: {
        'fc:frame': 'vNext',
        'fc:frame:image': 'https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg',
        'fc:frame:image:aspect_ratio': '1.91:1',
        'fc:frame:button:1': '🎫 Participate',
        'fc:frame:button:1:action': 'post_redirect',
        'fc:frame:post_url': `https://${req.headers.host}/api/frame`
      }
    });
  }

  const frameHtml = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
  <meta property="fc:frame:image:aspect_ratio" content="1.91:1">
  <meta property="fc:frame:button:1" content="🎫 Participate">
  <meta property="fc:frame:button:1:action" content="post_redirect">
  <meta property="fc:frame:post_url" content="https://${req.headers.host}/api/frame">

  <meta property="og:title" content="Neon Lottery | Daily ETH Lottery">
  <meta property="og:description" content="Win daily ETH prizes on Base Network">
  <meta property="og:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
  <meta property="og:url" content="https://${req.headers.host}">
  <meta property="og:type" content="website">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
