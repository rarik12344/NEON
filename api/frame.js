export default function handler(req, res) {
  const { buttonIndex } = req.query;
  
  // Конфигурация с вашими данными
  const CONFIG = {
    imageUrl: "https://i.ibb.co/LGGsLj0/neon-lottery-preview.png",
    baseUrl: "https://neon-xi.vercel.app",
    buttons: [
      "🎫 Buy Tickets",
      "🏆 Winners", 
      "📢 Share",
      "🔗 Connect"
    ],
    actions: [
      "buy",
      "winners",
      "share",
      "connect"
    ]
  };

  // Если нажата кнопка - редиректим на основное приложение
  if (buttonIndex >= 1 && buttonIndex <= 4) {
    const action = CONFIG.actions[buttonIndex - 1];
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext">
          <meta property="fc:frame:image" content="${CONFIG.imageUrl}">
          <meta http-equiv="refresh" content="0; url=${CONFIG.baseUrl}?frameAction=${action}" />
        </head>
      </html>
    `;
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  }

  // Исходный фрейм с кнопками
  const buttonsHtml = CONFIG.buttons.map((text, index) => 
    `<meta property="fc:frame:button:${index + 1}" content="${text}">`
  ).join('\n');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="${CONFIG.imageUrl}">
        ${buttonsHtml}
        <meta property="fc:frame:post_url" content="${CONFIG.baseUrl}/api/frame">
      </head>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
