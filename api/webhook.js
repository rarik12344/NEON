export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Пример обработки уведомления
    const event = req.body;
    console.log('Received webhook event:', event);

    // Обработка разных типов событий
    switch (event.type) {
      case 'user_action':
        // Логика для действий пользователя
        break;
      case 'transaction':
        // Логика для транзакций
        break;
      default:
        console.warn('Unhandled event type:', event.type);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
