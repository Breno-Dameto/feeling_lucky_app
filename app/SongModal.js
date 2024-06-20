import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Image from 'next/image';

const SongModal = ({ show, handleClose, track, songUrl }) => {
  // Verifique se 'track' e 'track.album.images[0]' existem antes de tentar acessar 'track.name'
  if (!track || !track.album || !track.album.images || track.album.images.length === 0) {
    return null; // Ou renderize algo que indique que os dados ainda não estão disponíveis
  }

  const redirectToSong = () => {
    window.open(songUrl, '_blank'); // Abre o link da música em uma nova aba
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{track.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image 
        unoptimized
        src={track.album.images[0].url} 
        alt={track.name} 
        style={{ width: '100%' }} 
        />
        <p>Artista: {track.artists[0].name}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={redirectToSong}>
          Ouvir Música
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SongModal;
