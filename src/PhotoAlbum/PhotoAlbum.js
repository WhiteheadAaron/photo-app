import React, { useState } from 'react';
import './PhotoAlbum.css';
import Photos from './Photos';

function PhotoAlbum() {

  const [state, setState] = useState({ photos: [], numberOfAlbums: 100, selectedAlbum: null });

  function generateThumbnails() {
    const n = state.numberOfAlbums;
    const array = [...Array(n)];

    return array.map((album, key) => {

      return (
        <div className='thumbnail' key={key} onClick={() => onAlbumSelect(key + 1)}>
          <p>{key + 1}</p>
        </div>
      )
    })
  }

  function clearSelectedAlbum() {
    setState({ ...state, selectedAlbum: null });
  }

  async function onAlbumSelect(albumId) {
    const album = await (await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)).json();
    console.log(album);
    setState({ ...state, photos: album, selectedAlbum: albumId });
  }


  return (
    <div>
      
      {!state.selectedAlbum && generateThumbnails()}
      {state.selectedAlbum && <Photos photos={state.photos} clear={clearSelectedAlbum} />}
    </div>
  );
}

export default PhotoAlbum;
