export default async function handler(req, res) {
  // Быстрый ответ без сложной логики
  const htmlResponse = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
        <meta property="fc:frame:button:1" content="🎫 Participate">
        <meta property="fc:frame:post_url" content="https://${process.env.VERCEL_URL}/api/frame">
      </head>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  return res.status(200).end(htmlResponse);
}
