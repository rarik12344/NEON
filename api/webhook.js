// api/webhook.js
export default async function handler(req, res) {
  // Поддержка CORS для preflight-запросов
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Farcaster-Frame-Signature');
    return res.status(200).end();
  }

  // Только POST-запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const event = req.body;
    console.log('📦 Received Farcaster webhook event:', JSON.stringify(event, null, 2));

    // Верификация подписи (рекомендуется для production)
    const signature = req.headers['x-farcaster-frame-signature'];
    if (process.env.NODE_ENV === 'production' && !signature) {
      console.warn('⚠️ Missing frame signature');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Обработка основных типов событий Farcaster
    switch (event.type) {
      case 'frame_action':
        console.log(`🖼 Frame action by ${event.actor?.fid} on ${new Date(event.timestamp).toISOString()}`);
        await handleFrameAction(event);
        break;

      case 'transaction':
        console.log(`💸 Transaction ${event.hash} (status: ${event.status})`);
        await handleTransaction(event);
        break;

      case 'user_action':
        console.log(`👤 User action: ${event.action} by ${event.actor?.fid}`);
        await handleUserAction(event);
        break;

      case 'ping':
        console.log('🏓 Ping received - webhook is active');
        break;

      default:
        console.warn(`⚠️ Unhandled event type: ${event.type}`);
    }

    // Успешный ответ
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

// Обработчики конкретных событий
async function handleFrameAction(event) {
  const { buttonIndex, inputText, fid } = event.data;
  console.log(`🔄 Processing frame action: button ${buttonIndex}, input: "${inputText}" by user ${fid}`);

  // Здесь можно:
  // 1. Записывать действия пользователей
  // 2. Обновлять состояние фреймов
  // 3. Инициировать процессы в ответ на действия
}

async function handleTransaction(event) {
  const { hash, status, chainId, to } = event.data;
  console.log(`🔄 Processing tx ${hash} (status: ${status}) on chain ${chainId}`);

  if (to.toLowerCase() === process.env.NEXT_PUBLIC_CONTRACT_ADDRESS.toLowerCase()) {
    console.log('🎫 Contract interaction detected - processing lottery tickets...');
    // Здесь можно обновлять состояние лотереи
  }
}

async function handleUserAction(event) {
  const { action, fid } = event.data;
  console.log(`🔄 Processing user action: ${action} by ${fid}`);

  // Пример обработки:
  if (action === 'ticket_purchase') {
    console.log('🎟️ New ticket purchase detected');
    // Логика обработки покупки билетов
  }
}
