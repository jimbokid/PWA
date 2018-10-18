import * as React from 'react';
import { shallow } from 'enzyme';
import { Auth } from './Auth';

const defaultProps = {
  classes: {},
};

let setup;

describe('<Auth/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return shallow(<Auth {...props} />);
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    setup();
  });
});
