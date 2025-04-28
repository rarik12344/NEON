export default async (req, res) => {
  const MINIAPP_URL = "https://neon-xi.vercel.app/?miniapp=true&source=frame&fid=" + 
    (req.body?.untrustedData?.fid || "");

  res.setHeader('Content-Type', 'application/json');
  
  return res.json({
    version: "vNext",
    status: "302",
    location: MINIAPP_URL,
    meta: {
      "og:image": "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
      "og:title": "Neon Lottery | Daily ETH Draws"
    }
  });
};
