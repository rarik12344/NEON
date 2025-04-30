// /api/auth/callback.js
import { FarcasterSigner } from '@farcaster/auth';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { code, state } = req.query;
    const nonce = req.cookies.farcaster_nonce;

    const signer = new FarcasterSigner({
      rpcUrl: 'https://mainnet.base.org',
      domain: 'neon-xi.vercel.app',
    });

    try {
      // Валидация ответа от Farcaster
      const { fid, username } = await signer.verifyAuthResponse({
        code,
        nonce,
        callbackUrl: 'https://neon-xi.vercel.app/api/auth/callback',
      });

      // Создание сессии пользователя
      const token = generateUserToken(fid); // Ваша функция для генерации JWT

      // Перенаправление в MiniApp с токеном
      res.setHeader('Set-Cookie', [
        `farcaster_auth=${token}; Path=/; HttpOnly; Secure`,
        `farcaster_nonce=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      ]);
      return res.redirect(302, `https://neon-xi.vercel.app/?auth=success`);
    } catch (error) {
      console.error('Auth error:', error);
      return res.redirect(302, `https://neon-xi.vercel.app/?auth=failed`);
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
