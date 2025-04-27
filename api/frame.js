export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Обработка POST-запросов от фреймов
    return res.status(200).json({
      type: 'frame',
      frame: {
        version: 'vNext',
        image: 'https://i.ibb.co/NdV9qyF/NEONLOTTERY.jpg',
        buttons: [
          { label: '🎫 Play Now', action: 'post' }
        ],
        postUrl: 'https://neon-xi.vercel.app/api/frame'
      }
    });
  }
  
  // GET-запрос для первоначальной загрузки
  return res.status(200).json({ status: 'ready' });
}
