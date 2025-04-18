export default function handler(req, res) {
  const { buttonIndex } = req.query;
  const baseUrl = "https://neon-xi.vercel.app";
  const imageUrl = "https://i.ibb.co/LGGsLj0/neon-lottery-preview.png";

  // Если нажата кнопка - редиректим на основное приложение с параметром
  if (buttonIndex) {
    const actions = ['buy', 'winners', 'share', 'connect'];
    const action = actions[buttonIndex - 1];
    
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext">
          <meta property="fc:frame:image" content="${imageUrl}">
          <meta http-equiv="refresh" content="0; url=${baseUrl}?frameAction=${action}" />
        </head>
      </html>
    `);
  }

  // Исходный фрейм с кнопками
  return res.status(200).send(`
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
  `);
}
