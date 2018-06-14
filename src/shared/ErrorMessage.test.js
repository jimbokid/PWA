import React from 'react';
import { shallow } from 'enzyme';
import { ErrorMessage } from './ErrorMessage';

const defaultProps = {
  error: {
    message: 'message',
    response: { data: { status_message: 'status' } },
  },
};

let setup;

describe('<ErrorMessage/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return shallow(<ErrorMessage {...props} />);
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    setup();
  });
});
