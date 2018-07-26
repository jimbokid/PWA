import React from 'react';
import { shallow } from 'enzyme';
import { WithLoader } from './WithLoader';

const defaultProps = {
  isLoading: true,
  classes: {},
};

let setup;

describe('<WithLoader/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return shallow(<WithLoader {...props} />);
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    setup();
  });
});
