"use client"
import Container from 'react-bootstrap/Container';
import Image from 'next/image';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import SongModal from './SongModal'
import GenreModal from './GenreModal';
const CLIENT_ID =  "dfda54de042a4ae7a7e9e4a784fa2876";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = 'https://feeling-lucky-app.vercel.app/'
const SPACE_DELIMITER = "%20";
const SCOPES = ["user-library-modify", "playlist-modify-public", "playlist-modify-private"];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
const playlistId = '0ZONf5IIceSP9ZyHU35CcvS'


const Home = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [showGenreModal, setShowGenreModal] = useState(false);
  const [genre, setGenre] = useState('');

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  }

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      if (token) {
        setAccessToken(token);
      }
    }
  }, []);
  

async function getProfile() {    
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    
      const data = await response.json();
      console.log(data);
  }

  const handleLetsGoClick = () => {
    setShowGenreModal(true); // Mostra o modal de seleção de gênero
  };


  const addRandomSongToPlaylist = async () => {
    if (!genre) {
      console.error('Nenhum gênero selecionado');
      return;
    }
    try {
      const fetchSongResponse = await fetch(`/api/fetchRandomSong?genre=${genre}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const { songId } = await fetchSongResponse.json();

      const addSongResponse = await fetch('/api/addSongToPlaylist', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ songId, playlistId })
      });
  
      if (addSongResponse.ok) {
        console.log('Música adicionada com sucesso!');
        // Aqui você pode buscar os detalhes da música e atualizar o estado
        const trackDetails = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }).then(res => res.json());

        setCurrentTrack(trackDetails); // Atualize o estado com os detalhes da música
        setShowModal(true); // Abra o modal
      } else {
        console.log('Houve um erro ao adicionar a música.');
      }
    } catch (error) {
      console.error('Erro ao adicionar música:', error);
    }
  };


return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <Navbar className="w-100 p-3">
      <Container className=''>
        <Navbar.Brand href="#home">
        <Image
        priority
        src="./Icon.svg"
        alt="Logo"
      />
    </Navbar.Brand>
    <Navbar.Collapse className="justify-content-end">
    <Nav>
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features" className='ml-24'>About</Nav.Link>
      <Nav.Link href="#pricing" className='ml-24'>Contact</Nav.Link>
    </Nav>
    </Navbar.Collapse>
     </Container>
      </Navbar>

    <div className="d-flex flex-column justify-content-center align-items-start flex-grow-1 ml-28">
    <Image
      src="./FEELING LUCKY_.svg"
      width={250}
      height={250}
      alt="Logo"
      priority
    />
    <p className="mt-2">CLICK AND <strong>DISCOVER YOUR
    NEW <br/>FAVORITE BRAZILLIAN SONG HERE!!</strong></p>
    <Button onClick={handleLetsGoClick} variant="dark" size="sm" className="btn btn-primary mt-3 w-48 h-12 rounded-pill">LETS GO!!!</Button>
    <GenreModal
        show={showGenreModal}
        handleClose={() => setShowGenreModal(false)}
        genre={genre}
        setGenre={setGenre}
        addRandomSongToPlaylist={addRandomSongToPlaylist}
      />
    <Button onClick={handleLogin} variant="dark" size="sm" className="btn btn-primary mt-3 w-48 h-12 rounded-pill">LOGIN TO SPOTIFY</Button>
    </div>
  <SongModal show={showModal} handleClose={() => setShowModal(false)} track={currentTrack} songUrl={currentTrack?.external_urls?.spotify} />
    </main>
  );
};

export default Home;