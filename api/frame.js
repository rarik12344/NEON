export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function GET() {
  return new Response(JSON.stringify({
    version: "vNext",
    image: "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
    buttons: [{
      label: "🎟 Buy Tickets", 
      action: "post"
    }],
    postUrl: "https://neon-xi.vercel.app/api/frame"
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}

export async function POST() {
  return new Response(JSON.stringify({
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
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}
