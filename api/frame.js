export default async function handler(req, res) {
  // POST-запрос от фрейма
  if (req.method === 'POST') {
    return Response.redirect('https://neon-xi.vercel.app/?action=participate', 302);
  }

  // GET-запрос (отображение фрейма)
  return new Response(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
        <meta property="fc:frame:button:1" content="🎫 Participate">
        <meta property="fc:frame:button:1:action" content="post_redirect">
        <meta property="fc:frame:post_url" content="https://neon-xi.vercel.app/api/frame">
      </head>
    </html>
  `, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
