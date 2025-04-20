import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { action, address, tickets } = req.body;

    if (!action || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const key = `points:${address.toLowerCase()}`;

    if (action === 'get') {
      const points = await kv.get(key) || 0;
      return res.status(200).json({ points: parseInt(points) });
    }
    else if (action === 'add') {
      const pointsToAdd = tickets * 10;
      const currentPoints = await kv.get(key) || 0;
      const newPoints = parseInt(currentPoints) + pointsToAdd;
      await kv.set(key, newPoints);
      return res.status(200).json({ points: newPoints });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    console.error('Points error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
