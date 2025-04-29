import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Farcaster-Frame-Signature'
}

export async function GET() {
  try {
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
      status: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('GET Error:', error)
    return new NextResponse(JSON.stringify({ error: "Frame generation failed" }), {
      status: 500,
      headers: CORS_HEADERS
    })
  }
}

export async function POST() {
  try {
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
      status: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('POST Error:', error)
    return new NextResponse(JSON.stringify({ error: "Frame processing failed" }), {
      status: 500,
      headers: CORS_HEADERS
    })
  }
}
