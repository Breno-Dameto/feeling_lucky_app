import axios from 'axios';
import queryString from 'query-string';

const CLIENT_ID =  "dfda54de042a4ae7a7e9e4a784fa2876";
const CLIENT_SECRET = "seu_client_secret";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { code } = req.body;
  
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        params: {
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URL_AFTER_LOGIN,
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
        console.error('Error retrieving access token:', error.message);
        res.status(error.response?.status || 500).json({ error: 'Failed to fetch access token' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end('Method Not Allowed');
    }
  }