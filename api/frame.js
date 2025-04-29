import { NextResponse } from 'next/server'

export const runtime = 'edge'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Farcaster-Frame-Signature',
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: CORS_HEADERS
  })
}

export async function GET() {
  const frameData = {
    version: "vNext",
    image: "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
    buttons: [{
      label: "🎟 Buy Tickets",
      action: "post"
    }],
    postUrl: "https://neon-xi.vercel.app/api/frame"
  }

  return new NextResponse(JSON.stringify(frameData), {
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json'
    }
  })
}

export async function POST() {
  const frameData = {
    version: "vNext",
    image: "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
    buttons: [
      { label: "⬅️ Back", action: "post" },
      { label: "1 Ticket", action: "post" },
      { label: "5 Tickets", action: "post" }
    ],
    postUrl: "https://neon-xi.vercel.app/api/frame"
  }

  return new NextResponse(JSON.stringify(frameData), {
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json'
    }
  })
}
