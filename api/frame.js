// /api/frame.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { buttonIndex } = req.body;

    // Обработка нажатия кнопки
    if (buttonIndex === 1) {
      return res.status(200).json({
        type: 'frame',
        frame: {
          version: 'vNext',
          image: 'https://i.ibb.co/HfcPqDfC/ogneon.jpg',
          buttons: [
            { label: '🎫 Купить билеты', action: 'post_redirect', target: 'https://neon-xi.vercel.app/' },
          ],
          postUrl: 'https://neon-xi.vercel.app/api/frame',
        },
      });
    }
  }

  // Возврат фрейма по умолчанию для GET-запросов
  res.status(200).json({
    type: 'frame',
    frame: {
      version: 'vNext',
      image: 'https://i.ibb.co/HfcPqDfC/ogneon.jpg',
      buttons: [
        { label: '🎫 Купить билеты', action: 'post_redirect', target: 'https://neon-xi.vercel.app/' },
      ],
      postUrl: 'https://neon-xi.vercel.app/api/frame',
    },
  });
}
