export const runtime = 'edge'

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Farcaster-Frame-Signature',
      'Cache-Control': 'public, max-age=86400'
    }
  })
}
