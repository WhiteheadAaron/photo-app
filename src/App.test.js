import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import App from './App';
import PhotoAlbum from './PhotoAlbum/PhotoAlbum';
import Loading from './PhotoAlbum/Loading';
import Photos from './PhotoAlbum/Photos';
import Description from './PhotoAlbum/Description';


describe('App Tests', () => {
  test('Renders App Component and has correct children', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.hasClass('App')).toBe(true);
    expect(wrapper.childAt(0).hasClass('header')).toBe(true);
  });
})

describe('Photo Album Tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PhotoAlbum />);
  });

  test('PhotoAlbum Component renders everything it is supposed to on the page', () => {
    expect(wrapper.find('div').length).toBe(100);
    expect(wrapper.childAt(0).hasClass('thumbnail')).toBe(true);
  });

  test('On click of an album, it should change the state and render the loading page', () => {
    let state = wrapper.state();

    expect(state.selectedAlbum).toBe(null);
    expect(state.loading).toBe(false);

    wrapper.find('.album-70').simulate('click');
    state = wrapper.state();

    expect(wrapper.childAt(0).debug()).toEqual('<Loading />');
    expect(state.selectedAlbum).toBe(70);
    expect(state.loading).toBe(true);
  });

  test('Clear Selected Album function', () => {
    let state = wrapper.state();

    expect(state.selectedAlbum).toBe(null);
    wrapper.find('.album-80').simulate('click');
    state = wrapper.state();
    expect(state.selectedAlbum).toBe(80);

    const clearFunction = wrapper.instance().clearSelectedAlbum;
    clearFunction();
    state = wrapper.state();
    expect(state.selectedAlbum).toBe(null);
  });

  test('On Album Select function', async () => {
    let state = wrapper.state();
    expect(state.selectedAlbum).toBe(null);
    expect(state.photos).toStrictEqual([]);

    const spy = jest.spyOn(global, 'fetch');
    const selectFunction = wrapper.instance().onAlbumSelect;
    await selectFunction(50)

    state = wrapper.state();
    expect(state.selectedAlbum).toBe(50);
    expect(spy).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/photos?albumId=50');
    expect(state.photos.length).toBe(50);
  });
})

describe('Loading Tests', () => {
  test('Renders Loading Screen Correctly', () => {
    const wrapper = shallow(<Loading />)
    expect(wrapper.find('p').length).toBe(1);
  });
});

describe('Description Tests', () => {
  test('Renders Description component correctly', () => {
    const wrapper = shallow(<Description />);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.hasClass('desc')).toBe(true);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').hasClass('clearButton')).toBe(true);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h2').hasClass('descH2')).toBe(true);
  });

  test('Go back to home page button works correctly', () => {
    const props = {
      clear: () => {}
    };
    const spy = jest.spyOn(props, 'clear');

    const wrapper = shallow(<Description clear={props.clear} />);
    const button = wrapper.find('button');
    button.simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});

describe('Photos Tests', () => {
  test('Renders Photos Screen correctly when there is just 1 photo', () => {
    const fakePhotos = [{
      "albumId": 1,
      "id": 1,
      "title": "accusamus beatae ad facilis cum similique qui sunt",
      "url": "https://via.placeholder.com/600/92c952",
      "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    }];


    const wrapper = shallow(<Photos photos={fakePhotos} />)
    expect(wrapper.hasClass('container')).toBe(true);
    expect(wrapper.find('.photo').length).toBe(1);
  });

  test('Renders Photos Screen correctly when there are 3 photos', () => {
    const fakePhotos = [{
      "albumId": 1,
      "id": 1,
      "title": "accusamus beatae ad facilis cum similique qui sunt",
      "url": "https://via.placeholder.com/600/92c952",
      "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    },
    {
      "albumId": 1,
      "id": 2,
      "title": "reprehenderit est deserunt velit ipsam",
      "url": "https://via.placeholder.com/600/771796",
      "thumbnailUrl": "https://via.placeholder.com/150/771796"
    },
    {
      "albumId": 1,
      "id": 3,
      "title": "officia porro iure quia iusto qui ipsa ut modi",
      "url": "https://via.placeholder.com/600/24f355",
      "thumbnailUrl": "https://via.placeholder.com/150/24f355"
    }];


    const wrapper = shallow(<Photos photos={fakePhotos} />)
    expect(wrapper.hasClass('container')).toBe(true);
    expect(wrapper.find('.photo').length).toBe(3);
  });
})
