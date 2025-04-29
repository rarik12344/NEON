import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS, POST',
      'Access-Control-Allow-Headers': 'Content-Type, X-Farcaster-Frame-Signature',
    },
  });
}

export async function GET() {
  const response = NextResponse.json({
    version: "vNext",
    image: "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
    buttons: [
      { label: "🎟 Buy Tickets", action: "post" }
    ],
    postUrl: "https://neon-xi.vercel.app/api/frame"
  });

  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}

export async function POST() {
  const response = NextResponse.json({
    version: "vNext",
    image: "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
    buttons: [
      { label: "⬅️ Back", action: "post" },
      { label: "1 Ticket", action: "post" },
      { label: "5 Tickets", action: "post" }
    ],
    postUrl: "https://neon-xi.vercel.app/api/frame"
  });

  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}
