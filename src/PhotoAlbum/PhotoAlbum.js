import React, { useState } from 'react';
import './PhotoAlbum.css';
import Photos from './Photos';
import Loading from './Loading';

function PhotoAlbum() {

  const [state, setState] = useState({ photos: [], numberOfAlbums: 100, selectedAlbum: null, loading: false });

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

  function onAlbumSelect(albumId) {
    setState({ ...state, loading: true })
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`).then(res => res.json().then(album => {
      setState({ ...state, photos: album, selectedAlbum: albumId, loading: false });
    })).catch(e => {
      console.log(e);
      setState({ ...state, selectedAlbum: null, loading: false });
    })
  }


  return (
    <React.Fragment>
      {state.loading && <Loading />}
      {!state.selectedAlbum && !state.loading && generateThumbnails()}
      {state.selectedAlbum && !state.loading && <Photos photos={state.photos} clear={clearSelectedAlbum} />}
    </React.Fragment>
  );
}

export default PhotoAlbum;
