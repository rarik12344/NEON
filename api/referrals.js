import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { action, address, referrer } = req.body;

    if (!action || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const refKey = `referral:${address.toLowerCase()}`;

    if (action === 'check') {
      const existingRef = await kv.get(refKey);
      return res.status(200).json({ hasReferral: !!existingRef });
    }
    else if (action === 'set' && referrer) {
      await kv.set(refKey, referrer.toLowerCase());
      
      // Начисляем бонус рефереру
      const pointsKey = `points:${referrer.toLowerCase()}`;
      const currentPoints = await kv.get(pointsKey) || 0;
      await kv.set(pointsKey, parseInt(currentPoints) + 20);
      
      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error('Referral error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
