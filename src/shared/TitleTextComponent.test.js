import * as React from 'react';
import { mount } from 'enzyme';
import TitleTextComponent from './TitleTextComponent';

const defaultProps = {
  title: 'title',
  text: 'text',
  classes: {},
};

let setup;

describe('<TitleTextComponent/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return mount(<TitleTextComponent {...props} />);
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    setup();
  });

  it('should render empty wrapper', () => {
    const wrapper = setup({
      text: null,
    });
    expect(wrapper.find('.emptyWrapper').length).toBe(1);
  });
});
