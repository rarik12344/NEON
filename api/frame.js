export default async (req, res) => {
  // Устанавливаем обязательные заголовки CORS и кеширования
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');

  // Обработка OPTIONS-запроса для CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Конфигурация Frame
  const frameConfig = {
    version: "vNext",
    image: "https://i.ibb.co/HfcPqDfC/ogneon.jpg", // Унифицированный URL изображения
    imageAspectRatio: "1.91:1",
    buttons: [
      { 
        label: "🎫 Buy Tickets", 
        action: "post_redirect" // Используем post_redirect вместо post
      }
    ],
    postUrl: "https://neon-xi.vercel.app/api/frame"
  };

  // Обработка POST-запроса (взаимодействие с кнопкой)
  if (req.method === 'POST') {
    try {
      const { untrustedData } = req.body;
      
      if (!untrustedData?.buttonIndex) {
        throw new Error('Invalid frame data');
      }

      console.log(`Frame action: Button ${untrustedData.buttonIndex} pressed by fid:${untrustedData.fid || 'unknown'}`);
      
      // Возвращаем обновленный Frame после нажатия кнопки
      return res.json({
        ...frameConfig,
        image: "https://i.ibb.co/HfcPqDfC/ogneon-processing.jpg", // Опционально: другая картинка
        buttons: [
          { 
            label: "Processing...", 
            action: "post_redirect"
          }
        ]
      });

    } catch (error) {
      console.error('Frame error:', error);
      return res.status(400).json({ 
        error: "Invalid request",
        details: error.message 
      });
    }
  }

  // GET-запрос: первоначальное отображение Frame
  return res.json(frameConfig);
}
