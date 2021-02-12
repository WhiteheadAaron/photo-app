import React from 'react';
import { render, screen } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import App from './App';
import PhotoAlbum from './PhotoAlbum/PhotoAlbum';



describe('App Tests', () => {
  test('Renders App Component and has correct children', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.hasClass('App')).toBe(true);
    expect(wrapper.childAt(0).hasClass('header')).toBe(true);
  });
})

describe.only('Photo Album Tests', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = shallow(<PhotoAlbum />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  test('PhotoAlbum Component renders everything it is supposed to on the page', () => {
    expect(wrapper.find('div').length).toBe(100);
    expect(wrapper.childAt(0).hasClass('thumbnail')).toBe(true);
  });

  test('On click of an album, it should change the state', () => {
    wrapper.find('.album-70').props().onClick();
    expect(setState).toHaveBeenCalled();
  })

})
