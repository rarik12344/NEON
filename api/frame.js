import { sdk } from '@farcaster/frame-sdk'

export default async function handler(req, res) {
  try {
    // Получаем контекст из SDK
    const context = sdk.context
    
    // Генерируем персонализированный контент
    const username = context.user?.username || 'friend'
    const buttonText = context.client.added ? '🎫 Participate' : '✨ Get Started'
    
    // HTML с динамическим контентом
    const html = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
  <!-- Обязательные мета-теги -->
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg">
  <meta property="fc:frame:button:1" content="${buttonText}">
  <meta property="fc:frame:post_url" content="https://${req.headers.host}/api/frame">
  
  <!-- Динамический title -->
  <title>Neon Lottery for ${username}</title>
  
  <!-- Безопасные стили -->
  <style>
    body {
      margin: 0;
      padding: ${getSafeAreaMargins(context.client.safeAreaInsets)};
      font-family: 'Poppins', sans-serif;
      background: #0f0f1a;
      color: white;
      text-align: center;
    }
    img {
      max-width: 100%;
      border-radius: 12px;
    }
  </style>
</head>
<body>
  <div style="padding: 20px;">
    <h1>Hello, ${username}!</h1>
    <img src="https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg" alt="Neon Lottery">
    <p>Daily ETH lottery on Base Network</p>
  </div>
  
  <!-- Инициализация SDK -->
  <script type="module">
    import { sdk } from 'https://unpkg.com/@farcaster/frame-sdk@latest/dist/sdk.esm.js'
    
    document.addEventListener('DOMContentLoaded', async () => {
      try {
        await sdk.actions.ready({
          disableNativeGestures: ${shouldDisableGestures(context.location)}
        })
        console.log('Frame ready!')
      } catch (error) {
        console.error('Failed to initialize SDK:', error)
      }
    })
  </script>
</body>
</html>`;

    // Устанавливаем заголовки
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Cache-Control', 'no-store, max-age=0')
    res.status(200).send(html)
    
  } catch (error) {
    console.error('Frame error:', error)
    res.status(500).send('Internal Server Error')
  }
}

// Вспомогательные функции
function getSafeAreaMargins(insets) {
  return insets ? `
    ${insets.top || 0}px 
    ${insets.right || 0}px 
    ${insets.bottom || 0}px 
    ${insets.left || 0}px
  ` : '0'
}

function shouldDisableGestures(location) {
  return location?.type === 'cast_embed' ? 'true' : 'false'
}
