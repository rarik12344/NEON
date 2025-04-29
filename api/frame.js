// api/frame.js
import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Добавляем runtime: edge

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'default';
    const amount = searchParams.get('amount') || '1';

    // Base configuration
    const baseUrl = 'https://neon-xi.vercel.app';
    const postUrl = `${baseUrl}/api/frame`;

    // Default frame configuration
    let frame = {
      image: `${baseUrl}/api/image`,
      version: 'vNext',
      buttons: [
        {
          label: '🎫 Купить билеты',
          action: 'post',
          target: `${postUrl}?action=buy`,
        },
        {
          label: '🏆 Победители',
          action: 'post',
          target: `${postUrl}?action=winners`,
        },
        {
          label: 'ℹ️ Как это работает',
          action: 'post',
          target: `${postUrl}?action=info`,
        },
      ],
      postUrl: postUrl,
    };

    // Handle different actions
    switch (action) {
      case 'buy':
        frame = {
          ...frame,
          image: `${baseUrl}/api/image?action=buy`,
          buttons: [
            {
              label: '⬅️ Назад',
              action: 'post',
              target: postUrl,
            },
            {
              label: '1 билет',
              action: 'post',
              target: `${postUrl}?action=confirm&amount=1`,
            },
            {
              label: '5 билетов',
              action: 'post',
              target: `${postUrl}?action=confirm&amount=5`,
            },
            {
              label: '10 билетов',
              action: 'post',
              target: `${postUrl}?action=confirm&amount=10`,
            },
          ],
        };
        break;

      case 'confirm':
        frame = {
          ...frame,
          image: `${baseUrl}/api/image?action=confirm&amount=${amount}`,
          buttons: [
            {
              label: '⬅️ Назад',
              action: 'post',
              target: `${postUrl}?action=buy`,
            },
            {
              label: 'Подтвердить',
              action: 'tx',
              target: `${baseUrl}/api/tx?amount=${amount}`,
              postUrl: `${postUrl}?action=tx_success`,
            },
          ],
        };
        break;

      case 'tx_success':
        frame = {
          ...frame,
          image: `${baseUrl}/api/image?action=success`,
          buttons: [
            {
              label: '🎉 Открыть приложение',
              action: 'link',
              target: baseUrl,
            },
            {
              label: '🔄 Еще билетов',
              action: 'post',
              target: `${postUrl}?action=buy`,
            },
          ],
        };
        break;

      case 'winners':
        frame = {
          ...frame,
          image: `${baseUrl}/api/image?action=winners`,
          buttons: [
            {
              label: '⬅️ Назад',
              action: 'post',
              target: postUrl,
            },
            {
              label: '🏆 Открыть приложение',
              action: 'link',
              target: baseUrl,
            },
          ],
        };
        break;

      case 'info':
        frame = {
          ...frame,
          image: `${baseUrl}/api/image?action=info`,
          buttons: [
            {
              label: '⬅️ Назад',
              action: 'post',
              target: postUrl,
            },
            {
              label: '📖 Правила',
              action: 'link',
              target: `${baseUrl}#rules`,
            },
          ],
        };
        break;
    }

    return new NextResponse(JSON.stringify(frame), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in frame.js:', error);
    return new NextResponse(JSON.stringify({
      error: 'Internal Server Error',
      message: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
