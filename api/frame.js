export default async function handler(req, res) {
  // 1. Базовые настройки
  const BASE_URL = "https://neon-xi.vercel.app";
  const TIMESTAMP = Date.now();
  const IMAGE_URL = `https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg?t=${TIMESTAMP}`;
  const POST_URL = `${BASE_URL}/api/frame?t=${TIMESTAMP}`;

  // 2. Формирование ответа Frame
  const frameResponse = {
    type: 'frame',
    frame: {
      version: 'vNext',
      image: IMAGE_URL,
      buttons: [{
        label: '🎫 Participate',
        action: 'post_redirect'
      }],
      postUrl: POST_URL,
      ogImage: IMAGE_URL,
      accepts: {
        'x-frame-payload': true
      }
    }
  };

  // 3. Обработка POST-запроса
  if (req.method === 'POST') {
    try {
      // Правильный парсинг входящего тела запроса
      let body;
      if (typeof req.body === 'string' && req.body.length > 0) {
        body = JSON.parse(req.body);
      } else if (typeof req.body === 'object') {
        body = req.body;
      } else {
        throw new Error('Invalid request body');
      }

      // Проверка структуры данных
      if (body?.untrustedData?.buttonIndex) {
        console.log('Valid frame interaction:', body.untrustedData);
        return res.status(200).json(frameResponse);
      }
      
      throw new Error('Invalid frame data');
    } catch (error) {
      console.error('Frame POST error:', error.message);
      // Возвращаем корректный Frame даже при ошибке
      return res.status(200).json(frameResponse);
    }
  }

  // 4. Обработка GET-запроса
  res.status(200).json(frameResponse);
}
