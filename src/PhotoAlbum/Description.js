import React from 'react';
import './PhotoAlbum.css';

function Description(props) {

  return (
    <div className='desc'>
      <button className='clearButton' onClick={props.clear}>Choose a different album</button>
      <h2 className='descH2'>Album {props.albumId}</h2>
    </div>
  );
}

export default Description;
