// api/frame.js
export default async function handler(req, res) {
  // 1. Конфигурация (можно вынести в отдельный файл)
  const CONFIG = {
    BASE_URL: "https://neon-xi.vercel.app",
    IMAGE: {
      url: "https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg",
      aspectRatio: "1:1" // Соотношение для Frame
    },
    BUTTONS: [
      {
        label: "🎫 Participate",
        action: "post_redirect",
        target: "https://neon-xi.vercel.app/" // Куда ведет кнопка
      }
    ]
  };

  // 2. Генерация URL
  const timestamp = Date.now();
  const imageUrl = `${CONFIG.IMAGE.url}?t=${timestamp}`;
  const postUrl = `${CONFIG.BASE_URL}/api/frame?t=${timestamp}`;

  // 3. Логирование запросов
  const logRequest = () => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (req.method === 'POST') {
      console.log('Body:', JSON.stringify(req.body, null, 2));
    }
  };

  // 4. Формирование ответа
  const buildFrame = () => ({
    type: 'frame',
    frame: {
      version: 'vNext',
      image: imageUrl,
      imageAspectRatio: CONFIG.IMAGE.aspectRatio,
      buttons: CONFIG.BUTTONS.map(btn => ({
        label: btn.label,
        action: btn.action,
        ...(btn.target ? { target: btn.target } : {})
      })),
      postUrl: postUrl,
      ogImage: imageUrl,
      accepts: { 'x-frame-payload': true }
    }
  });

  // 5. Обработка запроса
  try {
    logRequest();
    
    // Валидация POST-запроса
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      
      // Здесь можно добавить логику обработки разных кнопок
      if (body?.untrustedData?.buttonIndex) {
        console.log(`Button ${body.untrustedData.buttonIndex} pressed`);
      }
    }

    // Всегда возвращаем Frame
    res.status(200).json(buildFrame());
    
  } catch (error) {
    console.error('Error:', error);
    res.status(200).json(buildFrame()); // Важно всегда возвращать Frame
  }
}
