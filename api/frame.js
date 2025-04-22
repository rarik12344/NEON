module.exports = (req, res) => {
  if (req.method === 'POST') {
    // Обработка нажатия кнопки во фрейме
    res.writeHead(302, {
      Location: 'https://neon-xi.vercel.app/?action=participate'
    });
    res.end();
  } else {
    // Возвращаем метаданные фрейма для GET-запросов
    res.setHeader('Content-Type', 'text/html');
    res.end(`
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
    `);
  }
};
