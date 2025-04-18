export default function handler(req, res) {
  const { buttonIndex } = req.query;

  // Basic frame response
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'https://neon-xi.vercel.app'}/neon-lottery-preview.png">
        <meta property="fc:frame:button:1" content="🎫 Buy Tickets">
        <meta property="fc:frame:button:2" content="🏆 Winners">
        <meta property="fc:frame:button:3" content="📢 Share">
        <meta property="fc:frame:button:4" content="🔗 Connect">
        <meta property="fc:frame:post_url" content="${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'https://neon-xi.vercel.app'}/api/frame">
      </head>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
