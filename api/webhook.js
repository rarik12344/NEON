export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Here you would typically verify the Farcaster signature
    // const isValid = validateMessage(req.body);
    // if (!isValid) return res.status(400).json({ error: 'Invalid signature' });

    // Process valid webhook event
    console.log('Received webhook:', req.body);
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
