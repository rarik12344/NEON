export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({
      name: "Neon Lottery",
      iconUrl: "https://i.ibb.co/NdV9qyF/NEONLOTTERY-ICON.png",
      launchUrl: "https://neon-xi.vercel.app/?miniapp=true",
      permissions: ["identity", "wallet", "notifications"],
      chains: [{
        id: "0x2105",
        name: "Base",
        rpcUrl: "https://mainnet.base.org",
        iconUrl: "https://i.ibb.co/0jQ7JQz/base-logo.png",
        currency: "ETH"
      }],
      theme: {
        primaryColor: "#00f3ff",
        backgroundColor: "#0f0f1a",
        textColor: "#ffffff"
      },
      supportedFrames: true,
      frameValidationUrl: "https://neon-xi.vercel.app/api/frame"
    });
  }
  
  return res.status(405).end();
}
