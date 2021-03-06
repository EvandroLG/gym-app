import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

global.verifySnapshot = (component) => {
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
};

global.verifyMapStateToProps = (mapState, params, key,  output) => {
  expect(mapState(params)[key]).toEqual(output);
};

global.verifyMapDispatchToProps = (mapDispatch, method, props, calledWith) => {
  const mockCallback = jest.fn();
  const output = mapDispatch(mockCallback);

  output[method](...props);

  expect(mockCallback).toBeCalled();
  expect(mockCallback).toBeCalledWith(calledWith);
};
