export default async (req, res) => {
  const manifest = {
    "name": "Neon Lottery",
    "iconUrl": "https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg?" + Date.now(), // Добавляем timestamp
    "termsOfUseUrl": "https://neon-xi.vercel.app/terms",
    "privacyPolicyUrl": "https://neon-xi.vercel.app/privacy",
    "provider": {
      "name": "Neon Labs",
      "url": "https://neon-xi.vercel.app"
    },
    "app": {
      "identifier": "neon-lottery",
      "version": "1.0.0",
      "category": "games",
      "permissions": ["crypto", "notifications"]
    },
    "manifestUrl": "https://neon-xi.vercel.app/.well-known/farcaster.json",
    "redirectUrl": "https://neon-xi.vercel.app/",
    "api": {
      "frameApi": "https://neon-xi.vercel.app/api/frame",
      "webhookApi": "https://neon-xi.vercel.app/api/webhook"
    },
    "images": {
      "hero": "https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg?" + Date.now(),
      "splash": "https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg?" + Date.now(),
      "thumbnail": "https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg?" + Date.now()
    },
    "updatedAt": new Date().toISOString()
  };

  res
    .setHeader('Content-Type', 'application/json')
    .setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    .setHeader('Pragma', 'no-cache')
    .setHeader('Expires', '0')
    .setHeader('Surrogate-Control', 'no-store')
    .status(200)
    .json(manifest);
};
