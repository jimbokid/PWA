import reducer, { defaultState } from './dashboard';
import { types } from '../actions/Dashboard';

let payload;

const toEqualStates = (stateIn, stateOut) => {
  return expect(reducer(defaultState, stateIn)).toEqual(stateOut);
};

const error = new Error('Request failed with status code 404');

describe('settings reducers', () => {
  it('should return default state', () => {
    toEqualStates({ type: undefined }, { ...defaultState });
  });
  it('should handle FETCH_POPULAR_SUCCESS', () => {
    const data = {
      page: 1,
      total_results: 2245,
      total_pages: 113,
      results: [
        {
          vote_count: 887,
          id: 351286,
          video: false,
          vote_average: 6.8,
          title: 'Jurassic World: Fallen Kingdom',
          popularity: 308.904874,
          poster_path: '/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg',
          original_language: 'en',
          original_title: 'Jurassic World: Fallen Kingdom',
          genre_ids: [28, 12, 878],
          backdrop_path: '/gBmrsugfWpiXRh13Vo3j0WW55qD.jpg',
          adult: false,
          overview:
            'A volcanic eruption threatens the remaining dinosaurs on the island of Isla Nublar, where the creatures have freely roamed for several years after the demise of an animal theme park known as Jurassic World. Claire Dearing, the former park manager, has now founded the Dinosaur Protection Group, an organization dedicated to protecting the dinosaurs. To help with her cause, Claire has recruited Owen Grady, a former dinosaur trainer who worked at the park, to prevent the extinction of the dinosaurs once again.',
          release_date: '2018-06-22',
        },
      ],
    };
    payload = { data };

    toEqualStates(
      { type: types.FETCH_POPULAR_SUCCESS, payload },
      {
        ...defaultState,
        error: null,
        page: 2,
        popular: {
          results: data.results,
        },
        total_results: 2245,
        total_pages: 113,
      },
    );
  });

  it('should handle FETCH_POPULAR_ERROR', () => {
    payload = { error };
    toEqualStates(
      { type: types.FETCH_POPULAR_ERROR, payload },
      { ...defaultState, error: error },
    );
  });
});
