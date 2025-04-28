export default async (req, res) => {
  // Универсальные заголовки
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')

  // Preflight запрос
  if (req.method === 'OPTIONS') return res.status(204).end()

  // Основной Frame
  return res.json({
    version: "vNext",
    image: "https://i.ibb.co/HfcPqDfC/ogneon.jpg", 
    imageAspectRatio: "1.91:1",
    buttons: [{
      label: "🎟 Купить билеты",
      action: "post_redirect"
    }],
    postUrl: "https://neon-xi.vercel.app/api/redirect"
  })
}
