// api/frame.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      
      // Простая валидация запроса
      if (data.untrustedData && data.untrustedData.buttonIndex === 1) {
        return res.status(200).json({
          type: 'frame',
          frameUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/?frameAction=participate`
        });
      }
      
      return res.status(400).json({ error: "Invalid request" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  return res.status(405).json({ error: "Method not allowed" });
}
