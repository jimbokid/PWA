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

  it('should create correct listItem object', () => {
    const item = {
      title: 'title',
      poster_path: 'poster_path',
      id: 1,
      cast: true,
      profile_path: 'profile_path',
      character: {},
      name: 'name',
    };

    expect(generateListItem(true, item, 'type')).toEqual({
      image: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/profile_path',
      link: '/persondetail/1',
      subtitle: {},
      title: 'name',
    });
  });

  it('should create correct listItem object with other arguments', () => {
    const item = {
      poster_path: 'poster_path',
      id: 1,
      cast: false,
      profile_path: 'profile_path',
      character: {},
      original_name: 'original_name',
    };

    expect(generateListItem(false, item, 'type')).toEqual({
      image: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/poster_path',
      link: '/moviedetail/type/1',
      subtitle: null,
      title: 'original_name',
    });
  });
});
