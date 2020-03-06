import React from 'react';
import { shallow } from 'enzyme';
import {
  SearchResults,
  MovieWrapper,
  CardWrapper,
} from './SearchResults';

const defaultProps = {
  classes: {},
  data: {
    searchResults: {
      movie: {
        results: [
          {
            release_date: '1',
            original_title: '1',
            vote_average: '0',
            poster_path: '0',
          },
        ],
      },
      tv: {
        results: [{}],
      },
      person: {
        results: [],
      },
    },
  },
  match: {
    params: {
      id: 1,
      searchType: 'searchByName',
    },
  },
  fetchResultsSearch: jest.fn(),
  fetchByGenre: jest.fn(),
  clearSearch: jest.fn(),
  fetchByKeyword: jest.fn(),
  movie_results: 0,
  genres: {},
};

let setup;

describe('<MovieWrapper/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return shallow(<MovieWrapper {...props} />);
    };
  });

  it('renders without crashing', () => {
    setup({
      movie: {
        results: [
          {
            genre_ids: [{}],
          },
        ],
      },
    });
  });
});

describe('<SearchResults/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return shallow(<SearchResults {...props} />);
    };
  });

  it('renders without crashing', () => {
    setup();
    expect(defaultProps.fetchResultsSearch).toHaveBeenCalledTimes(1);
  });

  it('should render person list if person array isnt empty', () => {
    const wrapper = setup({
      data: {
        searchResults: {
          person: {
            results: [{}],
          },
          tv: {
            results: [{}],
          },
        },
      },
    });
    expect(wrapper.find('#personWrapper').length).toBe(1);
    expect(wrapper.find('#tvWrapper').length).toBe(1);
  });

  it('should call fetchByGenre', () => {
    const wrapper = setup({
      data: {
        searchResults: {
          movie: {
            results: [{}],
          },
          person: {
            results: [{}],
          },
          tv: {
            results: [{}],
          },
        },
      },
      match: {
        params: {
          id: 1,
          searchType: 'searchByGenre',
          genreName: 'test',
        },
      },
      movie_results: 10,
    });

    wrapper.find('InfiniteScroll').prop('next')();
    expect(defaultProps.fetchByGenre).toHaveBeenCalledTimes(2);
    expect(defaultProps.fetchByGenre).toHaveBeenCalledWith(1);
  });

  it('should call fetchByGenre', () => {
    const wrapper = setup({
      data: {
        searchResults: {
          movie: {
            results: [{}],
          },
          person: {
            results: [{}],
          },
          tv: {
            results: [{}],
          },
        },
      },
      match: {
        params: {
          id: 1,
          searchType: 'searchByKeyword',
          genreName: 'test',
        },
      },
      movie_results: 100,
    });

    wrapper.find('InfiniteScroll').prop('next')();
    expect(defaultProps.fetchByKeyword).toHaveBeenCalledTimes(2);
    expect(defaultProps.fetchByKeyword).toHaveBeenCalledWith(1);
  });

  it('have to clear search after umount', () => {
    const wrapper = setup();
    wrapper.unmount();
    expect(defaultProps.clearSearch).toHaveBeenCalledTimes(1);
  });

  it('should render CardWrapper', () => {
    const props = {
      classes: {},
      linkPath: 'linkPath',
      imagePath: 'imagePath',
      personCard: false,
      item: {},
    };
    shallow(<CardWrapper {...props} />);
  });
});
