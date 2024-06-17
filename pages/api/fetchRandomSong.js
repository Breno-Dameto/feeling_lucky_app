// pages/api/fetchRandomSong.js

let addedTracks = new Set();
export default async (req, res) => {
  const accessToken = req.headers.authorization.split(' ')[1]; // Obter o token de acesso do header
  const genre = req.query.genre;
  console.log('tokenaaa', accessToken)
  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=genre:%22${genre}%22&type=track&market=BR&limit=50`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    console.log('teste data', data)
    if (data.tracks && data.tracks.items.length > 0) {
      const unplayedTracks = data.tracks.items.filter(track => !addedTracks.has(track.id));
      if (unplayedTracks.length > 0) {
        // Escolha uma música aleatória da lista de não tocadas
        const randomTrack = unplayedTracks[Math.floor(Math.random() * unplayedTracks.length)];
        addedTracks.add(randomTrack.id); // Adicione a música ao conjunto de músicas tocadas
        res.status(200).json({ songId: randomTrack.id });
      } else {
        // Se todas as músicas já foram tocadas, trate o caso como preferir
        res.status(404).json({ error: 'No new tracks found' });
      }
    } else {
      // Se não houver itens, envie uma resposta de erro
      res.status(404).json({ error: 'No tracks found' });
    }
  } catch (error) {
    // Tratamento de erros para capturar qualquer erro na chamada da API ou no processamento dos dados
    console.error('Error fetching random song:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
