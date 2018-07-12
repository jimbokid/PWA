import React from 'react';
import { shallow } from 'enzyme';
import { SearchResultsComponent } from './SearchResultsComponent';

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
        results: [],
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
};

let setup;

describe('<SearchResultsComponent/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return shallow(<SearchResultsComponent {...props} />);
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
});
