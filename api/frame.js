export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    
    // Basic validation
    if (!body || !body.untrustedData || !body.untrustedData.buttonIndex) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Prepare response for Farcaster
    const response = {
      type: 'frame',
      frameUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://neon-xi.vercel.app'}/?frameAction=participate`,
      // Optional: you can return different frames based on button clicks
      buttons: [
        {
          label: "🎫 Participate",
          action: "post_redirect"
        }
      ]
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Frame handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
