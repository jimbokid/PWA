import * as React from 'react';
import { mount } from 'enzyme';
import VideoWrapper from './VideoWrapper';

const defaultProps = {
  data: [],
  classes: {},
  handleVideo: jest.fn(),
  openVideo: false,
  showVideoClicked: false,
};

let setup;

describe('<VideoWrapper/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return mount(<VideoWrapper {...props} />);
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    setup();
  });
});
