export default async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return res.json({
    frame: {
      version: "vNext",
      image: "https://i.ibb.co/qMYFwLc6/hueon.jpg",
      imageAspectRatio: "1.91:1",
      buttons: [{
        label: "🎫 Buy Tickets", 
        action: "post"
      }],
      postUrl: "https://neon-xi.vercel.app/api/frame"
    }
  });
}
