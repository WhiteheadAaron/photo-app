import React, { Component } from 'react';
import './PhotoAlbum.css';
import Photos from './Photos';
import Loading from './Loading';
import Fetch from './Fetch';

class PhotoAlbum extends Component {
  constructor() {
    super();
    this.clearSelectedAlbum = this.clearSelectedAlbum.bind(this);
    this.onAlbumSelect = this.onAlbumSelect.bind(this);
    this.state = { photos: [], numberOfAlbums: 100, selectedAlbum: null, loading: false };
  }

  generateThumbnails() {
    const n = this.state.numberOfAlbums;
    const array = [...Array(n)];

    return array.map((album, key) => {
      return (
        <div className={`thumbnail album-${key + 1}`} key={key} onClick={() => this.onAlbumSelect(key + 1)}>
          <p>{key + 1}</p>
        </div>
      )
    })
  }

  clearSelectedAlbum() {
    this.setState({ selectedAlbum: null });
  }

  async onAlbumSelect(albumId) {
    this.setState({ loading: true, selectedAlbum: albumId })
    const response = await Fetch(albumId);
    this.setState({ photos: response, loading: false });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loading && <Loading />}
        {!this.state.selectedAlbum && !this.state.loading && this.generateThumbnails()}
        {this.state.selectedAlbum && !this.state.loading && <Photos photos={this.state.photos} clear={this.clearSelectedAlbum} />}
      </React.Fragment>
    );
  }
}

export default PhotoAlbum;
