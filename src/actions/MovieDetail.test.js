import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { types, fetchDetailMovie } from './MovieDetail';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const error = new Error('Request failed with status code 404');

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = value.toString();
  }
}

describe('Dashboard actions', () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it('should call FETCH_MOVIE_DETAIL_SUCCESS with payload', () => {
    const promisesList = [
      { data: {} },
      { data: {} },
      { data: {} },
      { data: {} },
      {
        genres: [
          {
            id: 1,
            name: 'name',
          },
        ],
      },
      { data: {} },
    ];

    moxios.wait(() => {
      promisesList.forEach((item, index) => {
        moxios.requests.at(index).respondWith({
          status: 200,
          response: item,
        });
      });
    });

    const expectedActions = [
      { type: types.FETCH_MOVIE_DETAIL_START },
      {
        payload: {
          credits: { data: {} },
          data: { data: {} },
          genreList: { 1: 'name' },
          images: { data: {} },
          similar: { data: {} },
          videos: {
            data: {},
          },
        },
        type: types.FETCH_MOVIE_DETAIL_SUCCESS,
      },
    ];

    const store = mockStore({});

    return store.dispatch(fetchDetailMovie()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should call FETCH_SETTINGS_ERROR ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: { error },
      });
    });

    const expectedActions = [
      { type: types.FETCH_MOVIE_DETAIL_START },
      {
        payload: {
          error: error,
        },
        type: types.FETCH_MOVIE_DETAIL_ERROR,
      },
    ];

    const store = mockStore({});

    return store.dispatch(fetchDetailMovie()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
