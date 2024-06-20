import axios from 'axios';

const CLIENT_ID = "dfda54de042a4ae7a7e9e4a784fa2876";
const CLIENT_SECRET = "2d7c17b01f0147f19c98247b7cde3a0f"; // Armazene de forma segura, de preferência em variáveis de ambiente

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { code } = req.body;

    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI
      },
      headers: {
        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    try {
      const response = await axios(authOptions);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Erro ao obter token de acesso do Spotify:', error.message);
      res.status(error.response?.status || 500).json({ error: 'Falha ao obter token de acesso' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Método Não Permitido');
  }
  }