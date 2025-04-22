export default (req, res) => {
  const frameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
        <meta property="fc:frame:button:1" content="🎫 Participate">
        <meta property="fc:frame:post_url" content="https://neon-xi.vercel.app/api/frame">
      </head>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.send(frameHtml);
};
