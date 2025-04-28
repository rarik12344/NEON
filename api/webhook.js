import crypto from 'crypto';

const FRAME_SECRET = process.env.FRAME_SECRET;

function verifyWebhookSignature(body, signature) {
  if (!FRAME_SECRET) return true; // Skip verification in development
  
  const hmac = crypto.createHmac('sha256', FRAME_SECRET);
  hmac.update(JSON.stringify(body));
  const digest = hmac.digest('hex');
  
  return digest === signature;
}

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Farcaster-Frame-Signature');
    return res.status(200).end();
  }

  // Only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const event = req.body;
    const signature = req.headers['x-farcaster-frame-signature'];
    
    // Verify signature in production
    if (process.env.NODE_ENV === 'production' && !verifyWebhookSignature(event, signature)) {
      console.warn('⚠️ Invalid webhook signature');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log('📦 Received Farcaster event:', event.type);

    // Process different event types
    switch (event.type) {
      case 'frame_action':
        await handleFrameAction(event);
        break;
      case 'transaction':
        await handleTransaction(event);
        break;
      case 'user_action':
        await handleUserAction(event);
        break;
      case 'ping':
        console.log('🏓 Ping received');
        break;
      default:
        console.warn(`⚠️ Unhandled event type: ${event.type}`);
    }

    // Success response
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ 
      success: true,
      processed_event: event.type,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Webhook error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}

async function handleFrameAction(event) {
  const { buttonIndex, fid, castId } = event.data;
  console.log(`🖼 Frame action by ${fid} on cast ${castId?.castId} - button ${buttonIndex}`);
  
  // Здесь можно:
  // 1. Логировать действия пользователей
  // 2. Обновлять статистику
  // 3. Триггерить другие процессы
}

async function handleTransaction(event) {
  const { hash, status, chainId, to } = event.data;
  console.log(`💸 Transaction ${hash} (status: ${status}) on chain ${chainId}`);
  
  if (to?.toLowerCase() === process.env.NEXT_PUBLIC_CONTRACT_ADDRESS?.toLowerCase()) {
    console.log('🎫 Contract interaction detected');
    // Обработка покупки билетов
  }
}

async function handleUserAction(event) {
  const { action, fid } = event.data;
  console.log(`👤 User action: ${action} by ${fid}`);
  
  if (action === 'ticket_purchase') {
    console.log('🎟️ New ticket purchase detected');
    // Логика обработки покупки билетов
  }
}
