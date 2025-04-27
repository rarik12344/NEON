export default async function handler(req, res) {
  // Явно указываем базовый URL
  const BASE_URL = "https://neon-xi.vercel.app";
  const imageUrl = `https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg?t=${Date.now()}`;
  const postUrl = `${BASE_URL}/api/frame?t=${Date.now()}`;
  
  // Формируем правильный ответ Frame
  const frameResponse = {
    type: 'frame',
    frame: {
      version: 'vNext',
      image: imageUrl,
      buttons: [
        {
          label: '🎫 Participate',
          action: 'post_redirect'
        }
      ],
      postUrl: postUrl,
      // Добавляем дополнительные параметры для лучшей совместимости
      ogImage: imageUrl,
      accepts: {
        'x-frame-payload': true
      }
    }
  };

  // Обработка POST-запроса
  if (req.method === 'POST') {
    try {
      // Правильный парсинг входящих данных
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const buttonIndex = body?.untrustedData?.buttonIndex;
      
      if (buttonIndex === 1) {
        return res.status(200).json(frameResponse);
      }
    } catch (error) {
      console.error('Frame POST error:', error);
      return res.status(400).json({ error: 'Invalid request' });
    }
  }

  // Обработка GET-запроса
  res.status(200).json(frameResponse);
}
