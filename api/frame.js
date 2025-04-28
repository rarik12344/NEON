export default async (req, res) => {
  // Устанавливаем заголовки
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Cache-Control', 'public, max-age=300');

  // Обработка OPTIONS для CORS
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Конфигурация Frame
  const frameData = {
    version: "vNext",
    image: "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
    imageAspectRatio: "1.91:1",
    buttons: [
      {
        label: "🎫 Buy Tickets",
        action: "post_redirect"
      }
    ],
    postUrl: "https://neon-xi.vercel.app/api/frame"
  };

  // Обработка POST-запроса
  if (req.method === 'POST') {
    try {
      const { untrustedData } = req.body;
      
      if (!untrustedData?.buttonIndex) {
        throw new Error('Invalid frame data');
      }

      // Обновляем Frame после нажатия кнопки
      return res.json({
        ...frameData,
        image: "https://i.ibb.co/HfcPqDfC/ogneon-processing.jpg",
        buttons: [
          {
            label: "Processing...",
            action: "post_redirect"
          }
        ]
      });

    } catch (error) {
      console.error('Frame error:', error);
      return res.status(400).json({ error: "Invalid request" });
    }
  }

  // GET-запрос: первоначальное отображение Frame
  return res.json(frameData);
};
