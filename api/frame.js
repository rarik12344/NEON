export default function handler(req, res) {
  const { buttonIndex } = req.query;

  const imageUrl = "https://i.ibb.co/LGGsLj0/neon-lottery-preview.png";
  const baseUrl = "https://neon-xi.vercel.app";

  if (buttonIndex) {
    // Обработка нажатия кнопки
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext">
          <meta property="fc:frame:image" content="${imageUrl}">
          <meta http-equiv="refresh" content="0; url=${baseUrl}?action=${buttonIndex}" />
        </head>
      </html>
    `;
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  }

  // Исходный фрейм
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="${imageUrl}">
        <meta property="fc:frame:button:1" content="🎫 Buy Tickets">
        <meta property="fc:frame:button:2" content="🏆 Winners">
        <meta property="fc:frame:button:3" content="📢 Share">
        <meta property="fc:frame:button:4" content="🔗 Connect">
        <meta property="fc:frame:post_url" content="${baseUrl}/api/frame">
      </head>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
