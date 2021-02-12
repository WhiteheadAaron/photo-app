import App from './App';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('App', () => {


  test('it should render', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<App />);
    const result = renderer.getRenderOutput();

    console.log(result);
  })


});
