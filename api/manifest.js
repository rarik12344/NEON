export default async (req, res) => {
  // Полностью отключаем все виды кэширования
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
  res.setHeader('X-Vercel-Cache-Control', 'no-store');

  const manifest = {
    accountAssociation: {
      header: "eyJmaWQiOjY4MzQ3NywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDFCRERDZjc3Mzc0NWIyNzI3RjBCN2JjNUZmMzVBN2RhZTYxZTEyNDgifQ",
      payload: "eyJkb21haW4iOiJuZW9uLXhpLnZlcmNlbC5hcHAifQ",
      signature: "MHgxMmQ3MDRiZWJlMTJhYmZhOTM1YTVmZWQzMmI1YjAwYjFkNmVjYzUzNTkzZTQ0ZThhNmExNDFiNjYxNTY2YWNiNzYwZGQ4MTE1MDBkYjA5NmY1ZWJlMTk5OWY2MjQzYTc4ODZiNTViYTQ1ZjAxZmZiMzRkNjg5YzZkMzIwM2EwNTFj"
    },
    manifest: {
      version: "1.0",
      name: "Neon Lottery",
      icon: {
        sm: "https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg",
        md: "https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg",
        lg: "https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg"
      },
      splash: {
        image: "https://i.ibb.co/NdV9qyFh/NEONLOTTERY.jpg",
        backgroundColor: "#0f0f1a"
      },
      home: "https://neon-xi.vercel.app/",
      webhook: "https://neon-xi.vercel.app/api/webhook",
      permissions: []
    }
  };

  // Добавляем случайный параметр для полного обхода кэша
  manifest._nonce = Date.now();

  return res.status(200).json(manifest);
};
