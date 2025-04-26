export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Обработка действия из фрейма
    const { buttonIndex } = req.body;
    
    if (buttonIndex === 1) {
      // Перенаправление на страницу покупки билетов
      return res.status(200).json({
        type: 'redirect',
        url: 'https://neon-xi.vercel.app/?frameAction=buy'
      });
    }
  }

  // Ответ по умолчанию
  res.status(200).json({
    type: 'message',
    message: 'Neon Lottery - Daily ETH Draws'
  });
}
