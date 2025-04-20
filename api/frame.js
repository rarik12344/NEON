export default function handler(req, res) {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);
    const buttonIndex = body.untrustedData.buttonIndex;
    
    let redirectUrl = 'https://neon-xi.vercel.app/?frameAction=';
    
    switch(buttonIndex) {
      case 1: redirectUrl += 'buy'; break;
      case 2: redirectUrl += 'winners'; break;
      case 3: redirectUrl += 'share'; break;
      case 4: redirectUrl += 'info'; break;
      default: redirectUrl += 'info';
    }
    
    res.status(302).setHeader('Location', redirectUrl).end();
  } else {
    res.status(200).json({ message: 'Frame endpoint' });
  }
}
