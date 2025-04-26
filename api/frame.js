export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { buttonIndex } = req.body;
    if (buttonIndex === 1) {
      return res.status(200).json({
        type: 'redirect',
        url: 'https://neon-xi.vercel.app/?frameAction=buy'
      });
    }
  }

  // Ответ для GET-запроса (предпросмотр Frame)
  res.status(200).json({
    type: 'frame',
    imageUrl: 'https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg',
    buttons: [{ label: '🎫 Participate', action: 'post' }],
    postUrl: 'https://neon-xi.vercel.app/api/frame'
  });
}
