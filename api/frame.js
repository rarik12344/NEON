export default async function handler(req, res) {
  try {
    // Устанавливаем обязательные заголовки
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Минимальный рабочий Frame
    const response = {
      frame: {
        version: "vNext",
        image: "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
        imageAspectRatio: "1.91:1",
        buttons: [
          { label: "🎫 Buy Tickets", action: "post" }
        ],
        postUrl: "https://neon-xi.vercel.app/api/frame"
      }
    };

    return res.status(200).json(response);
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: "Frame invocation failed",
      details: error.message 
    });
  }
}
