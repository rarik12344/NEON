import { createCanvas } from 'canvas';
import crypto from 'crypto';

const FRAME_SECRET = process.env.FRAME_SECRET;

function verifySignature(body, signature) {
  if (!FRAME_SECRET) return true; // Skip verification in development
  
  const hmac = crypto.createHmac('sha256', FRAME_SECRET);
  hmac.update(JSON.stringify(body));
  const digest = hmac.digest('hex');
  
  return digest === signature;
}

function getDefaultFrame(state = '') {
  return {
    type: 'frame',
    frame: {
      version: 'vNext',
      image: 'https://i.ibb.co/NdV9qyF/NEONLOTTERY.jpg',
      imageAspectRatio: '1.91:1',
      buttons: [
        { label: '🎫 Buy Tickets', action: 'post_redirect' },
        { label: '🏆 Winners', action: 'post' },
        { label: 'ℹ️ Info', action: 'post' }
      ],
      postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frame?state=${encodeURIComponent(state)}`,
      framesUrl: `${process.env.NEXT_PUBLIC_URL}`
    }
  };
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Verify signature in production
      if (process.env.NODE_ENV === 'production') {
        const signature = req.headers['x-farcaster-frame-signature'];
        if (!signature || !verifySignature(req.body, signature)) {
          return res.status(401).json({ error: 'Invalid signature' });
        }
      }

      const { untrustedData, trustedData } = req.body;
      const buttonIndex = untrustedData?.buttonIndex;
      const state = untrustedData?.state || '';
      
      // Handle different button actions
      let response;
      switch(buttonIndex) {
        case 1: // Buy Tickets
          response = {
            type: 'frame',
            frame: {
              version: 'vNext',
              image: `${process.env.NEXT_PUBLIC_URL}/api/image?type=buy&state=${state}`,
              imageAspectRatio: '1.91:1',
              buttons: [
                { label: '🔙 Back', action: 'post' },
                { label: '🎟 Buy Now', action: 'post_redirect' }
              ],
              postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frame?action=buy&state=${state}`,
              framesUrl: `${process.env.NEXT_PUBLIC_URL}`
            }
          };
          break;
        case 2: // Winners
          response = {
            type: 'frame',
            frame: {
              version: 'vNext',
              image: `${process.env.NEXT_PUBLIC_URL}/api/image?type=winners&state=${state}`,
              imageAspectRatio: '1.91:1',
              buttons: [
                { label: '🔙 Back', action: 'post' },
                { label: 'View All', action: 'link', target: `${process.env.NEXT_PUBLIC_URL}/winners` }
              ],
              postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frame?action=winners&state=${state}`,
              framesUrl: `${process.env.NEXT_PUBLIC_URL}`
            }
          };
          break;
        case 3: // Info
          response = {
            type: 'frame',
            frame: {
              version: 'vNext',
              image: `${process.env.NEXT_PUBLIC_URL}/api/image?type=info&state=${state}`,
              imageAspectRatio: '1.91:1',
              buttons: [
                { label: '🔙 Back', action: 'post' },
                { label: 'Learn More', action: 'link', target: `${process.env.NEXT_PUBLIC_URL}/info` }
              ],
              postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frame?action=info&state=${state}`,
              framesUrl: `${process.env.NEXT_PUBLIC_URL}`
            }
          };
          break;
        default:
          response = getDefaultFrame(state);
      }

      return res.status(200).json(response);
    } catch (error) {
      console.error('Frame error:', error);
      return res.status(200).json(getDefaultFrame());
    }
  }

  // GET request - return default frame
  return res.status(200).json(getDefaultFrame());
}
