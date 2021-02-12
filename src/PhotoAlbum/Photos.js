import React from 'react';
import './PhotoAlbum.css';
import Description from './Description';

function Photos(props) {



  function generateIndividualAlbum() {
    console.log(props);

    return props.photos.map((photo, key) => {
      return (
        <div className='photo' key={key}>
          <div className='photoInfo'>
            <p>Photo Id: {photo.id}</p>
            <p>Photo Title: {photo.title}</p>
          </div>
          <img className='image' src={photo.thumbnailUrl} />
          <a className='link' href={photo.url}>View Full Image</a>
        </div>
      )
    })
  }

  return (
    <div className='container'>
      <Description albumId={props.photos[0].albumId} clear={props.clear} />
      {generateIndividualAlbum()}
    </div>
  );
}

export default Photos;
