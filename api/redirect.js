export default async (req, res) => {
  // Устанавливаем заголовки
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // URL вашего MiniApp с параметрами
  const redirectUrl = 'https://neon-xi.vercel.app/?miniapp=true&source=frame';
  
  // Возвращаем редирект
  return res.json({
    version: "vNext",
    status: "302",
    location: redirectUrl,
    meta: {
      "og:image": "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
      "og:title": "Переход в Neon Lottery"
    }
  });
};
