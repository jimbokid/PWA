import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';

const defaultProps = {
  classes: {},
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
});
