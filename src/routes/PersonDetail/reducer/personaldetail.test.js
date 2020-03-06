import reducer, { defaultState } from './persondetail';
import { types } from '../actions/PersonDetail';

let payload;

const toEqualStates = (stateIn, stateOut) => {
  return expect(reducer(defaultState, stateIn)).toEqual(stateOut);
};

const error = new Error('Request failed with status code 404');

describe('personal detail reducers', () => {
  it('should return default state', () => {
    toEqualStates({ type: undefined }, { ...defaultState });
  });
  it('should handle FETCH_PERSON_DETAIL_START', () => {
    toEqualStates(
      { type: types.FETCH_PERSON_DETAIL_START },
      {
        ...defaultState,
        isLoading: true,
      },
    );
  });
  it('should handle FETCH_PERSON_DETAIL_SUCCESS', () => {
    payload = {
      data: {
        name: 'data',
      },
      movies: {
        results: [],
      },
    };

    toEqualStates(
      { type: types.FETCH_PERSON_DETAIL_SUCCESS, payload },
      {
        ...defaultState,
        data: { name: 'data' },
        movies: {
          results: [],
        },
        isLoading: false,
      },
    );
  });

  it('should handle FETCH_PERSON_DETAIL_ERROR', () => {
    payload = { error };
    toEqualStates(
      { type: types.FETCH_PERSON_DETAIL_ERROR, payload },
      { ...defaultState, error: error, isLoading: false },
    );
  });

  it('should handle CLEAN_PERSON_DETAIL', () => {
    toEqualStates({ type: types.CLEAN_PERSON_DETAIL }, { ...defaultState });
  });
});
