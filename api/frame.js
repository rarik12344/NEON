export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { untrustedData } = req.body;
    
    if (untrustedData.buttonIndex === 1) {
      return res.status(200).json({
        type: 'frame',
        image: `https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg?t=${Date.now()}`,
        buttons: [
          {
            label: '🎫 Participate',
            action: 'post_redirect',
          }
        ],
        postUrl: `https://neon-xi.vercel.app/api/frame?t=${Date.now()}`,
      });
    }
  }

  // GET request - initial frame
  res.status(200).json({
    type: 'frame',
    image: `https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg?t=${Date.now()}`,
    buttons: [
      {
        label: '🎫 Participate',
        action: 'post_redirect',
      }
    ],
    postUrl: `https://neon-xi.vercel.app/api/frame?t=${Date.now()}`,
  });
}
