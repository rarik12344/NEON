// /api/auth.js
import { FarcasterSigner } from '@farcaster/auth';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Инициализация аутентификации
    const signer = new FarcasterSigner({
      rpcUrl: 'https://mainnet.base.org', // или ваш RPC
      domain: 'neon-xi.vercel.app',
    });

    // Генерация ссылки для аутентификации
    const { authUrl, nonce } = await signer.generateAuthUrl({
      callbackUrl: 'https://neon-xi.vercel.app/api/auth/callback',
    });

    // Сохранение nonce в сессии (например, в cookies)
    res.setHeader('Set-Cookie', `farcaster_nonce=${nonce}; Path=/; HttpOnly`);
    return res.redirect(302, authUrl);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
