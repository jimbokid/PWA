import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';

const defaultProps = {
  classes: {},
  toggleSearch: jest.fn(),
};

let setup;

describe('<Header/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return shallow(<Header {...props} />);
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    setup();
  });

  // it('should call toggleSearch fn', () => {
  //   const wrapper = setup();
  //   wrapper.find('.searchBtn').simulate('click');
  //   expect(defaultProps.toggleSearch).toHaveBeenCalledTimes(1);
  // });
});
