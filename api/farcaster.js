export default async (req, res) => {
  // Устанавливаем правильные заголовки ПЕРЕД отправкой ответа
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');

  // Явно запрещаем кэширование в Vercel
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

  return res.status(200).json(manifest);
};
