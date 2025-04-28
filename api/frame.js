export default async (req, res) => {
  // Устанавливаем CORS-заголовки для ВСЕХ типов запросов
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Особенная обработка OPTIONS-запроса (preflight)
  if (req.method === 'OPTIONS') {
    // Добавляем дополнительные заголовки для preflight
    res.setHeader('Access-Control-Max-Age', '86400'); // Кешируем preflight на 24 часа
    return res.status(204).end(); // No Content
  }

  // Остальной код обработки GET/POST запросов...
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');

  // Ваша основная логика обработки Frame
  const frameConfig = {
    version: "vNext",
    image: "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
    buttons: [{ label: "🎫 Buy Tickets", action: "post_redirect" }],
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
