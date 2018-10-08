import React from 'react';
import { shallow, mount } from 'enzyme';
import { MovieList, generateListItem } from './MovieList';

const defaultProps = {
  data: [
    {
      title: 'title',
      poster_path: 'poster_path',
      id: 1,
    },
  ],
  classes: {
    gridList: 'gridList',
    cardLayout: 'cardLayout',
  },
  inline: false,
  type: 'movie',
  cast: null,
  cols: null,
};

let setup;

describe('<MovieList/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return shallow(<MovieList {...props} />);
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing and call fetch', () => {
    setup();
  });

  it('call function to set position of movie list', () => {
    const wrapper = mount(<MovieList {...defaultProps} />);

    wrapper.setProps({
      data: [
        {
          title: 'title',
          poster_path: 'poster_path',
          id: 1,
        },
      ],
    });
  });

  it('should render icon for no poster item', () => {
    const wrapper = setup({
      data: [
        {
          title: 'title',
          poster_path: 'poster_path',
          id: 1,
          profile_path: null,
        },
      ],
    });

    expect(wrapper.find('.cameraAltIcon').length).toBe(1);
  });

  it('should render avatar item', () => {
    const wrapper = setup({
      data: [
        {
          title: 'title',
          poster_path: 'poster_path',
          id: 1,
          profile_path: null,
          vote_average: '1',
        },
      ],
    });

    expect(wrapper.find('.avatarItem').length).toBe(1);
  });



  it('should get correct classname for inline list - cardLayout', () => {
    const wrapper = setup();

    expect(wrapper.props().className).toBe('cardLayout');
  });

  it('should get correct classname for inline list - gridList', () => {
    const wrapper = setup({
      inline: true,
    });

    expect(wrapper.props().className).toBe('gridList');
  });
});
