export const runtime = 'edge'

export async function GET() {
  return new Response(JSON.stringify({
    version: "vNext",
    image: "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
    buttons: [{ label: "🎟 Test Button", action: "post" }],
    postUrl: "https://neon-xi.vercel.app/api/frame-new"
  }), {
    status: 200,
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
      { label: "Test Action", action: "post" }
    ]
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}
