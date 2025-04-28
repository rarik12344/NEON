export default async (req, res) => {
  // Заголовки CORS
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Обработка ввода пользователя
  if (req.method === 'POST') {
    try {
      const { untrustedData } = req.body;
      const ticketCount = parseInt(untrustedData.inputText);
      
      // Валидация ввода
      if (isNaN(ticketCount) || ticketCount < 1 || ticketCount > 100) {
        return res.json({
          version: "vNext",
          image: "https://i.ibb.co/HfcPqDfC/ogneon-error.jpg",
          buttons: [{ label: "Некорректное число (1-100)", action: "post" }],
          postUrl: "https://neon-xi.vercel.app/api/frame"
        });
      }

      // Успешный ответ
      return res.json({
        version: "vNext",
        image: "https://i.ibb.co/HfcPqDfC/ogneon-processing.jpg",
        buttons: [{ label: `Покупаем ${ticketCount} билетов...`, action: "post_redirect" }],
        postUrl: `https://neon-xi.vercel.app/api/process?count=${ticketCount}`
      });

    } catch (error) {
      console.error('Error:', error);
      return errorResponse(res);
    }
  }

  // Первоначальный GET-запрос
  return res.json({
    version: "vNext",
    image: "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
    input: { text: "Введите количество билетов (1-100)" },
    buttons: [{ label: "🎫 Купить", action: "post" }],
    postUrl: "https://neon-xi.vercel.app/api/frame"
  });
};

function errorResponse(res) {
  return res.json({
    version: "vNext",
    image: "https://i.ibb.co/HfcPqDfC/ogneon-error.jpg",
    buttons: [{ label: "Ошибка, попробуйте снова", action: "post" }],
    postUrl: "https://neon-xi.vercel.app/api/frame"
  });
}
