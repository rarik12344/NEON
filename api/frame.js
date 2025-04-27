export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { buttonIndex, fid } = req.body;
    
    if (buttonIndex === 1) {
      return res.status(200).json({
        type: 'redirect',
        url: `https://neon-xi.vercel.app/?frameAction=buy&fid=${fid}`
      });
    }
  }

  // Dynamic image generation (optional)
  const imageUrl = `https://neon-xi.vercel.app/api/image?date=${Date.now()}`;

  res.status(200).json({
    type: 'frame',
    imageUrl: imageUrl,
    buttons: [
      { label: '🎫 Participate', action: 'post' },
      { label: '🏆 Winners', action: 'post' }
    ],
    postUrl: 'https://neon-xi.vercel.app/api/frame'
  });
}
