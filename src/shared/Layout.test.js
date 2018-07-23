import * as React from 'react';
import { shallow } from 'enzyme';
import Layout from './Layout';

const defaultProps = {
  classes: {},
};

let setup;

describe('<Layout/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return shallow(
        <Layout {...props}>
          <div id="test">Test</div>
        </Layout>,
      );
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.find('#test').length).toBe(1);
  });
});
