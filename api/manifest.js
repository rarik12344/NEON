export default async (req, res) => {
  const manifest = {
    "name": "Neon Lottery",
    "iconUrl": "https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg",
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
      "hero": "https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg",
      "splash": "https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg",
      "thumbnail": "https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg"
    }
  };

  res
    .setHeader('Content-Type', 'application/json')
    .setHeader('Cache-Control', 'no-store, max-age=0')
    .status(200)
    .json(manifest);
};
