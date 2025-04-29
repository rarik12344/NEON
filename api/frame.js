// api/frame.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'default';

  // Base configuration
  const baseUrl = 'https://neon-xi.vercel.app';
  const imageUrl = 'https://i.ibb.co/HfcPqDfC/ogneon.jpg';
  const postUrl = `${baseUrl}/api/frame`;

  // Frame configuration
  let frame = {
    image: imageUrl,
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
      const amount = searchParams.get('amount') || '1';
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
}
