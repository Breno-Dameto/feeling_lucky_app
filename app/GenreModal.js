import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const GenreModal = ({ show, handleClose, genre, setGenre, addRandomSongToPlaylist }) => {
    const [selectedGenre, setSelectedGenre] = useState('');
  
    const genres = ['Rock brasileiro', 'Pop', 'Mpb', 'Sertanejo', 'Funk', 'Pagode', 'Samba']; // Substitua com os gêneros disponíveis na sua API
  
    const handleGenreChange = (event) => {
        setGenre(event.target.value); // Atualiza o gênero no componente pai imediatamente
      };
  
const handleSearchClick = () => {
        setGenre(selectedGenre); // Define o gênero selecionado no estado do componente pai
        addRandomSongToPlaylist(); // Chama a função para adicionar a música à playlist
        handleClose(); // Fecha o modal
      };

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Selecione um gênero para descobrir sua nova música favorita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <select class="form-select" aria-label="Default select example" key={genre} onChange={handleGenreChange}>
      <option value="" disabled selected>Clique aqui para selecionar</option>
      {genres.map(genre => (
    <option key={genre} value={genre}>{genre}</option>
  ))}
    </select>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleSearchClick}>
          Adicionar música à playlist
        </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  export default GenreModal;