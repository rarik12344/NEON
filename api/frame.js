export default async function handler(req, res) {
  // Базовый URL для изображения с параметром времени для избежания кэширования
  const imageUrl = `https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg?t=${Date.now()}`;
  
  // Обработка POST-запроса (взаимодействие с кнопкой)
  if (req.method === 'POST') {
    try {
      const body = JSON.parse(req.body);
      const buttonIndex = body.untrustedData?.buttonIndex;
      
      if (buttonIndex === 1) {
        return res.status(200).json({
          type: 'frame',
          frame: {
            version: 'vNext',
            image: imageUrl,
            buttons: [
              {
                label: '🎫 Participate',
                action: 'post_redirect',
              }
            ],
            postUrl: `${process.env.BASE_URL}/api/frame?t=${Date.now()}`,
          }
        });
      }
    } catch (error) {
      console.error('Frame POST error:', error);
    }
  }

  // Обработка GET-запроса (первоначальный показ Frame)
  res.status(200).json({
    type: 'frame',
    frame: {
      version: 'vNext',
      image: imageUrl,
      buttons: [
        {
          label: '🎫 Participate',
          action: 'post_redirect',
        }
      ],
      postUrl: `${process.env.BASE_URL}/api/frame?t=${Date.now()}`,
    }
  });
}
