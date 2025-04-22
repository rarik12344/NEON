export default function handler(req, res) {
  if (req.method === 'POST') {
    // Обработка действия из фрейма
    const frameAction = req.body.untrustedData.buttonIndex;
    
    if (frameAction === 1) { // Кнопка Participate
      return res.redirect(302, `https://neon-xi.vercel.app/?frameAction=participate`);
    }

    // Возвращаем Frame-ответ
    return res.status(200).json({
      type: 'frame',
      frame: {
        version: 'vNext',
        image: 'https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg',
        buttons: [
          {
            label: '🎫 Participate',
            action: 'post_redirect'
          }
        ],
        postUrl: 'https://neon-xi.vercel.app/api/frame'
      }
    });
  }

  // GET запрос - показываем базовый фрейм
  return res.status(200).json({
    type: 'frame',
    frame: {
      version: 'vNext',
      image: 'https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg',
      buttons: [
        {
          label: '🎫 Participate',
          action: 'post_redirect'
        }
      ],
      postUrl: 'https://neon-xi.vercel.app/api/frame'
    }
  });
}
