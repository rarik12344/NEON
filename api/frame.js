export default async (req, res) => {
  // Устанавливаем обязательные заголовки
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Cache-Control', 'public, max-age=300');

  // Обработка OPTIONS-запроса для CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Валидация POST-запроса
  if (req.method === 'POST') {
    try {
      if (!req.body.untrustedData?.buttonIndex) {
        throw new Error('Invalid frame data');
      }

      const { buttonIndex } = req.body.untrustedData;
      
      // Логируем нажатие кнопки
      console.log(`Button ${buttonIndex} pressed by fid:${req.body.untrustedData.fid || 'unknown'}`);
      
      // Ответ при нажатии кнопки "Buy Tickets"
      return res.json({
  version: "vNext",
  image: "https://i.ibb.co/qMYFwLc6/hueon.jpg",
  buttons: [{ label: "🎫 Buy Tickets", action: "post_redirect" }],
  postUrl: "https://neon-xi.vercel.app/api/frame"
});
    } catch (error) {
      console.error('Frame error:', error);
      return res.status(400).json({ 
        error: "Invalid request",
        details: error.message 
      });
    }
  }

  // Стандартный GET-ответ (первый показ Frame)
  return res.json({
    frame: {
      version: "vNext",
      image: "https://i.ibb.co/qMYFwLc6/hueon.jpg",
      imageAspectRatio: "1.91:1",
      buttons: [
        { 
          label: "🎫 Buy Tickets", 
          action: "post" 
        }
      ],
      postUrl: "https://neon-xi.vercel.app/api/frame"
    }
  });
}
