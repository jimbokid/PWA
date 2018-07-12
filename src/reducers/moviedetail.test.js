import reducer, { defaultState } from './moviedetail';
import { types } from '../actions/MovieDetail';

let payload;

const toEqualStates = (stateIn, stateOut) => {
  return expect(reducer(defaultState, stateIn)).toEqual(stateOut);
};

const error = new Error('Request failed with status code 404');

describe('settings reducers', () => {
  it('should return default state', () => {
    toEqualStates({ type: undefined }, { ...defaultState });
  });
  it('should handle FETCH_MOVIE_DETAIL_START', () => {
    toEqualStates(
      { type: types.FETCH_MOVIE_DETAIL_START },
      {
        ...defaultState,
        isLoading: true,
        error: null,
      },
    );
  });
  it('should handle FETCH_MOVIE_DETAIL_SUCCESS', () => {
    payload = {
      data: {
        name: 'data',
      },
      credits: {
        cast: [],
        crew: [],
      },
      similar: {
        results: [],
      },
      videos: {
        results: [],
      },
      images: {},
      genreList: {},
    };

    toEqualStates(
      { type: types.FETCH_MOVIE_DETAIL_SUCCESS, payload },
      {
        ...defaultState,
        credits: { cast: [], crew: [] },
        data: { name: 'data' },
        error: null,
        genres: {},
        images: {},
        isLoading: false,
        similar: { results: [] },
      },
    );
  });

  it('should handle FETCH_MOVIE_DETAIL_ERROR', () => {
    payload = { error };
    toEqualStates(
      { type: types.FETCH_MOVIE_DETAIL_ERROR, payload },
      { ...defaultState, error: error },
    );
  });

  it('should handle CLEAN_MOVIE_DETAIL', () => {
    toEqualStates({ type: types.CLEAN_MOVIE_DETAIL }, { ...defaultState });
  });
});
