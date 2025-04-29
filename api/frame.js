import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  return NextResponse.json({
    version: "vNext",
    image: "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
    buttons: [
      { label: "🎟 Buy Tickets", action: "post" }
    ],
    postUrl: "https://neon-xi.vercel.app/api/frame"
  });
}

export async function POST() {
  return NextResponse.json({
    version: "vNext",
    image: "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
    buttons: [
      { label: "⬅️ Back", action: "post" },
      { label: "1 Ticket", action: "post" },
      { label: "5 Tickets", action: "post" }
    ],
    postUrl: "https://neon-xi.vercel.app/api/frame"
  });
}
