export default async function handler(req, res) {
  // 1. Конфигурация Frame (все URL должны быть абсолютными!)
  const config = {
    baseUrl: "https://neon-xi.vercel.app",
    imageUrl: "https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg",
    buttons: [
      {
        label: "🎫 Participate",
        action: "post_redirect",
        target: "https://neon-xi.vercel.app/" // Куда ведет кнопка
      }
    ]
  };

  // 2. Генерация URL с timestamp
  const timestamp = Date.now();
  const imageUrl = `${config.imageUrl}?t=${timestamp}`;
  const postUrl = `${config.baseUrl}/api/frame?t=${timestamp}`;

  // 3. Формируем ответ строго по спецификации Farcaster
  const frameResponse = {
    type: 'frame',
    frame: {
      version: 'vNext', // Обязательно!
      image: imageUrl,  // Абсолютный URL
      imageAspectRatio: "1:1", // "1:1" или "1.91:1"
      buttons: config.buttons.map(btn => ({
        label: btn.label,
        action: btn.action,
        ...(btn.target ? { target: btn.target } : {}) // Опционально
      })),
      postUrl: postUrl, // Абсолютный URL
      // Дополнительные параметры:
      ogImage: imageUrl,
      accepts: { 
        'x-frame-payload': true 
      }
    }
  };

  // 4. Всегда возвращаем HTTP 200 и валидный Frame
  res.status(200)
    .setHeader('Content-Type', 'application/json')
    .setHeader('Cache-Control', 'no-store')
    .json(frameResponse);
}
