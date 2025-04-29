// api/image.js
import { ImageResponse } from 'next/og';

export const runtime = 'edge'; // Явное указание runtime

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'default';
    const amount = searchParams.get('amount') || '1';

    // Common styles
    const commonStyles = {
      background: '#0f0f1a',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      padding: '20px',
      fontFamily: '"Space Grotesk", sans-serif',
      backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(0, 243, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 0, 255, 0.08) 0%, transparent 50%)',
    };

    // Generate different images based on action
    const generateContent = () => {
      switch (action) {
        case 'buy':
          return (
            <div style={commonStyles}>
              <h1 style={{ fontSize: '48px', color: '#00f3ff', marginBottom: '20px' }}>✨ NEON LOTTERY ✨</h1>
              <p style={{ fontSize: '24px', marginBottom: '30px' }}>Купить билеты</p>
              <p style={{ fontSize: '18px', color: '#b8b8d3', marginBottom: '40px' }}>Выберите количество билетов для покупки</p>
              <p style={{ fontSize: '16px', color: '#9d00ff' }}>1 билет = 0.0005 ETH (~$1.50)</p>
            </div>
          );

        case 'confirm':
          const totalEth = (0.0005 * parseInt(amount)).toFixed(4);
          const totalUsd = (1.5 * parseInt(amount)).toFixed(2);
          return (
            <div style={commonStyles}>
              <h1 style={{ fontSize: '48px', color: '#00f3ff', marginBottom: '20px' }}>✨ NEON LOTTERY ✨</h1>
              <p style={{ fontSize: '24px', marginBottom: '30px' }}>Подтверждение покупки</p>
              <p style={{ fontSize: '20px', color: '#b8b8d3', marginBottom: '10px' }}>{amount} билет{amount === '1' ? '' : 'ов'}</p>
              <p style={{ fontSize: '24px', color: '#ff00ff', marginBottom: '30px' }}>{totalEth} ETH (~${totalUsd})</p>
              <p style={{ fontSize: '16px', color: '#9d00ff' }}>Включая комиссию сети (~$0.30)</p>
            </div>
          );

        case 'success':
          return (
            <div style={commonStyles}>
              <h1 style={{ fontSize: '48px', color: '#00ff88', marginBottom: '20px' }}>🎉 УСПЕХ! 🎉</h1>
              <p style={{ fontSize: '24px', marginBottom: '30px' }}>Билеты успешно куплены!</p>
              <p style={{ fontSize: '18px', color: '#b8b8d3', marginBottom: '40px' }}>Спасибо за участие в розыгрыше</p>
              <p style={{ fontSize: '16px', color: '#00f3ff' }}>Следующий розыгрыш через 12:34:56</p>
            </div>
          );

        case 'winners':
          return (
            <div style={commonStyles}>
              <h1 style={{ fontSize: '48px', color: '#00f3ff', marginBottom: '20px' }}>✨ NEON LOTTERY ✨</h1>
              <p style={{ fontSize: '24px', marginBottom: '30px' }}>Последние победители</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span>Round #42</span>
                  <span style={{ color: '#ff00ff' }}>0.125 ETH</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span>Round #41</span>
                  <span style={{ color: '#ff00ff' }}>0.098 ETH</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span>Round #40</span>
                  <span style={{ color: '#ff00ff' }}>0.156 ETH</span>
                </div>
              </div>
              <p style={{ fontSize: '16px', color: '#9d00ff' }}>Все транзакции верифицируемы на BaseScan</p>
            </div>
          );

        case 'info':
          return (
            <div style={commonStyles}>
              <h1 style={{ fontSize: '48px', color: '#00f3ff', marginBottom: '20px' }}>✨ NEON LOTTERY ✨</h1>
              <p style={{ fontSize: '24px', marginBottom: '30px' }}>Как это работает</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#00f3ff' }}>✓</span>
                  <span>Ежедневные розыгрыши ETH</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#00f3ff' }}>✓</span>
                  <span>Прозрачность на блокчейне</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#00f3ff' }}>✓</span>
                  <span>Мгновенные выплаты</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#00f3ff' }}>✓</span>
                  <span>Реферальные бонусы</span>
                </div>
              </div>
              <p style={{ fontSize: '16px', color: '#9d00ff' }}>Все транзакции записываются в Base</p>
            </div>
          );

        default:
          return (
            <div style={commonStyles}>
              <h1 style={{ fontSize: '48px', color: '#00f3ff', marginBottom: '20px' }}>✨ NEON LOTTERY ✨</h1>
              <p style={{ fontSize: '24px', marginBottom: '30px' }}>Ежедневные розыгрыши ETH на Base</p>
              <p style={{ fontSize: '20px', color: '#ff00ff', marginBottom: '40px' }}>Следующий розыгрыш: 12:34:56</p>
              <p style={{ fontSize: '18px', color: '#b8b8d3', marginBottom: '10px' }}>Текущий призовой фонд:</p>
              <p style={{ fontSize: '24px', color: '#00ff88' }}>0.456 ETH (~$1,368)</p>
            </div>
          );
      }
    };

    return new ImageResponse(generateContent(), {
      width: 1200,
      height: 630,
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate image' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
