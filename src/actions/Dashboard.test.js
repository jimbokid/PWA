import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { types, fetchPopularMovies } from './Dashboard';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const error = new Error('Request failed with status code 404');

describe('Dashboard actions', () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it('should call FETCH_POPULAR_SUCCESS with payload', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          results: [],
        },
      });
    });

    const expectedActions = [
      {
        type: types.FETCH_POPULAR_SUCCESS,
        payload: {
          data: { results: [] },
        },
      },
    ];

    const store = mockStore({
      dashboard: {
        page: 1,
      },
    });

    return store.dispatch(fetchPopularMovies()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should call FETCH_SETTINGS_ERROR ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: error,
      });
    });

    const expectedActions = [
      {
        type: types.FETCH_POPULAR_ERROR,
        payload: {
          error: error,
        },
      },
    ];

    const store = mockStore({
      dashboard: {
        page: 1,
      },
    });

    return store.dispatch(fetchPopularMovies()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
