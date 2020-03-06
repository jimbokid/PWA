import reducer, { defaultState } from './search';
import { types } from '../actions/Search';

let payload;

const toEqualStates = (stateIn, stateOut) => {
  return expect(reducer(defaultState, stateIn)).toEqual(stateOut);
};

const error = new Error('Request failed with status code 404');

describe('personal detail reducers', () => {
  it('should return default state', () => {
    toEqualStates({ type: undefined }, { ...defaultState });
  });

  it('should handle FETCH_SEARCH_START', () => {
    toEqualStates(
      { type: types.FETCH_SEARCH_START },
      { ...defaultState, isLoading: true },
    );
  });

  it('should handle FETCH_SEARCH_SUCCESS', () => {
    payload = {
      data: {
        results: [],
      },
    };

    toEqualStates(
      { type: types.FETCH_SEARCH_SUCCESS, payload },
      {
        ...defaultState,
        data: { results: [] },
        error: null,
      },
    );
  });

  it('should handle FETCH_RESULT_SEARCH_SUCCESS', () => {
    payload = {
      movie: {
        results: [],
        page: 1,
        total_pages: 1,
        total_results: 1,
      },
      tv: { results: [] },
      person: { results: [] },
      genre: [],
    };

    toEqualStates(
      { type: types.FETCH_RESULT_SEARCH_SUCCESS, payload },
      {
        ...defaultState,
        searchResults: {
          movie: {
            results: [],
          },
          tv: {
            results: [],
          },
          person: {
            results: [],
          },
        },
        movie_page: 2,
        movie_pages: 1,
        movie_results: 1,
        error: null,
        genre: [],
      },
    );
  });

  it('should handle CLEAR_SEATCH_RESSULTS', () => {
    toEqualStates({ type: types.CLEAR_SEATCH_RESSULTS }, { ...defaultState });
  });

  it('should handle FETCH_SEARCH_ERROR', () => {
    payload = { error };
    toEqualStates(
      { type: types.FETCH_SEARCH_ERROR, payload },
      { ...defaultState, error: error },
    );
  });
});
