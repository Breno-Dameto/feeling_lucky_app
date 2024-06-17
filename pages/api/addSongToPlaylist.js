export default async (req, res) => {
  const { songId, playlistId } = req.body;
  const accessToken = req.headers.authorization.split(' ')[1]; // Obter o token de acesso do header

  const url = `https://api.spotify.com/v1/me/tracks?ids=${songId}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ids: [songId] }) // Adicione esta linha
  });
  
  if (response.ok) {
    console.log('Track added to playlist!');
    res.status(200).json({ message: 'Track added to playlist!' });
  } else {
    console.error('Failed to add track to playlist:', response);
    res.status(500).json({ error: 'Failed to add track to playlist' });
  }
}
