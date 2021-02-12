import React, { Component } from 'react';
import './PhotoAlbum.css';
import Description from './Description';

class Photos extends Component {

  generateIndividualAlbum() {

    return this.props.photos.map((photo, key) => {
      return (
        <div className='photo' key={key}>
          <div className='photoInfo'>
            <p>Photo Id: {photo.id}</p>
            <p>Photo Title: {photo.title}</p>
          </div>
          <img className='image' src={photo.thumbnailUrl} alt={photo.id} />
          <a className='link' href={photo.url}>View Full Image</a>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='container'>
        <Description albumId={this.props.photos[0].albumId} clear={this.props.clear} />
        {this.generateIndividualAlbum()}
      </div>
    );
  }
}

export default Photos;
