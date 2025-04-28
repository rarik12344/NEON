export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Verify signature in production
      if (process.env.NODE_ENV === 'production') {
        const signature = req.headers['x-farcaster-frame-signature'];
        if (!signature) return res.status(401).json({ error: 'Unauthorized' });
        
        // Add signature verification logic here
      }

      const { untrustedData } = req.body;
      const buttonIndex = untrustedData?.buttonIndex;
      
      // Handle different button actions
      let response;
      switch(buttonIndex) {
        case 1:
          response = {
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
              postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frame`,
              framesUrl: `${process.env.NEXT_PUBLIC_URL}`
            }
          };
          break;
        default:
          response = getDefaultFrame();
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

function getDefaultFrame() {
  return {
    type: 'frame',
    frame: {
      version: 'vNext',
      image: 'https://i.ibb.co/NdV9qyF/NEONLOTTERY.jpg',
      imageAspectRatio: '1.91:1',
      buttons: [
        { label: '🎫 Play Now', action: 'post_redirect' }
      ],
      postUrl: `${process.env.NEXT_PUBLIC_URL}/api/frame`,
      framesUrl: `${process.env.NEXT_PUBLIC_URL}`
    }
  };
}
