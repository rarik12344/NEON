import { NextResponse } from 'next/server'

export const runtime = 'edge'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Farcaster-Frame-Signature'
}

export async function GET() {
  try {
    return new NextResponse(JSON.stringify({
      version: "vNext",
      image: "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
      buttons: [{ label: "🎟 Buy Tickets", action: "post" }],
      postUrl: "https://neon-xi.vercel.app/api/frame"
    }), {
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Frame GET error:', error)
    return new NextResponse(null, { status: 500 })
  }
}

export async function POST() {
  try {
    return new NextResponse(JSON.stringify({
      version: "vNext",
      image: "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
      buttons: [
        { label: "⬅️ Back", action: "post" },
        { label: "1 Ticket", action: "post" },
        { label: "5 Tickets", action: "post" }
      ],
      postUrl: "https://neon-xi.vercel.app/api/frame"
    }), {
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Frame POST error:', error)
    return new NextResponse(null, { status: 500 })
  }
}
