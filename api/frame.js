import { createCanvas } from 'canvas';
import crypto from 'crypto';

const FRAME_SECRET = process.env.FRAME_SECRET;

function verifySignature(body, signature) {
  if (!FRAME_SECRET) return true;
  const hmac = crypto.createHmac('sha256', FRAME_SECRET);
  hmac.update(JSON.stringify(body));
  return hmac.digest('hex') === signature;
}

export default async function handler(req, res) {
  // Установка заголовков кеширования
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=600');

  if (req.method === 'POST') {
    try {
      if (process.env.NODE_ENV === 'production' && 
          !verifySignature(req.body, req.headers['x-farcaster-frame-signature'])) {
        return res.status(401).json({ error: 'Invalid signature' });
      }

      const { untrustedData } = req.body;
      const response = {
        type: 'frame',
        frame: {
          version: 'vNext',
          image: `https://neon-xi.vercel.app/api/image?t=${Date.now()}`, // Добавлен timestamp для избежания кеширования
          imageAspectRatio: '1.91:1', // Критически важный параметр
          buttons: [
            { label: '🎫 Buy Tickets', action: 'post_redirect' },
            { label: '🏆 Winners', action: 'post' }
          ],
          postUrl: 'https://neon-xi.vercel.app/api/frame',
          framesUrl: 'https://neon-xi.vercel.app/'
        }
      };

      return res.status(200).json(response);
    } catch (error) {
      console.error('Frame error:', error);
      return res.status(200).json({
        frame: {
          version: 'vNext',
          image: 'https://neon-xi.vercel.app/api/image?error=1',
          imageAspectRatio: '1.91:1',
          buttons: [{ label: 'Retry', action: 'post' }],
          postUrl: 'https://neon-xi.vercel.app/api/frame'
        }
      });
    }
  }

  // GET request
  return res.status(200).json({
    frame: {
      version: 'vNext',
      image: 'https://neon-xi.vercel.app/api/image',
      imageAspectRatio: '1.91:1',
      buttons: [{ label: 'Start', action: 'post' }],
      postUrl: 'https://neon-xi.vercel.app/api/frame'
    }
  });
}
