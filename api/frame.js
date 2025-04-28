export default async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  // Обработка нажатия кнопки
  if (req.method === 'POST') {
    const { buttonIndex } = req.body.untrustedData;
    console.log(`Нажата кнопка ${buttonIndex}`);
    
    return res.json({
      frame: {
        version: "vNext",
        image: "https://i.ibb.co/qMYFwLc6/hueon.jpg",
        buttons: [{ label: "🎫 Processing...", action: "post" }],
        postUrl: "https://neon-xi.vercel.app/api/frame"
      }
    });
  }
  
  // Первоначальный GET-запрос
  return res.json({
    frame: {
      version: "vNext",
      image: "https://i.ibb.co/qMYFwLc6/hueon.jpg",
      buttons: [{ label: "🎫 Buy Tickets", action: "post" }],
      postUrl: "https://neon-xi.vercel.app/api/frame"
    }
  });
}
