import * as React from 'react';
import { shallow } from 'enzyme';
import { Layout } from './Layout';

const defaultProps = {
  classes: {},
};

let setup;

describe('<Layout/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return shallow(<Layout {...props} />);
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    setup();
  });

  it('should change state value', () => {
    const wrapper = setup();
    wrapper.instance().toggleSearch();
    expect(wrapper.state().openSearch).toEqual(true);
  });
});
