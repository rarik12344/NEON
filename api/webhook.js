export default async (req, res) => {
  if (req.method === 'POST') {
    console.log('Received webhook:', req.body);
    res.status(200).json({ success: true });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
