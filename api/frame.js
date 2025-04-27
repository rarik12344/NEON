// api/frame.js
export default async function handler(req, res) {
  // 1. Настройка базовых параметров
  const HARDCODED_BASE_URL = "https://neon-xi.vercel.app"; // На случай проблем с env переменными
  const BASE_URL = process.env.BASE_URL || HARDCODED_BASE_URL;
  const TIMESTAMP = Date.now();
  
  // 2. URL ресурсов с anti-cache параметрами
  const IMAGE_URL = `https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg?t=${TIMESTAMP}`;
  const POST_URL = `${BASE_URL}/api/frame?t=${TIMESTAMP}`;
  
  // 3. Формирование ответа Frame
  const frameResponse = {
    type: 'frame',
    frame: {
      version: 'vNext', // Обязательная версия
      image: IMAGE_URL, // Абсолютный URL изображения
      buttons: [{
        label: '🎫 Participate', // Максимум 4 кнопки
        action: 'post_redirect' // Или 'post' для обычного действия
      }],
      postUrl: POST_URL, // Абсолютный URL для обработки
      ogImage: IMAGE_URL, // Дублирование для совместимости
      accepts: { // Дополнительные параметры
        'x-frame-payload': true
      }
    }
  };

  // 4. Обработка POST-запроса (взаимодействие пользователя)
  if (req.method === 'POST') {
    try {
      // Парсинг входящих данных
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const buttonIndex = body?.untrustedData?.buttonIndex;
      
      // Логирование для отладки
      console.log('Received POST:', {
        buttonIndex,
        body: JSON.stringify(body, null, 2)
      });

      // Обработка действия кнопки
      if (buttonIndex === 1) {
        return res.status(200).json(frameResponse);
      }
    } catch (error) {
      console.error('Frame POST error:', error);
      return res.status(400).json({ error: 'Invalid request' });
    }
  }

  // 5. Обработка GET-запроса (первоначальная загрузка Frame)
  console.log('Serving GET frame');
  res.status(200).json(frameResponse);
}
