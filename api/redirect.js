export default async (req, res) => {
  // Устанавливаем заголовки
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // URL для редиректа в MiniApp
  const redirectUrl = 'https://neon-xi.vercel.app/?miniapp=true&source=frame';
  
  // Возвращаем ответ с редиректом
  return res.json({
    version: "vNext",
    status: "302",
    location: redirectUrl,
    meta: {
      "og:image": "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
      "og:title": "Neon Lottery - Купить билеты"
    }
  });
};
