import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  types,
  fetchByGenre,
  fetchSearch,
  fetchResultsSearch,
  fetchByKeyword,
} from './Search';
import { fetchDetailPerson } from './PersonDetail';

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

describe('Search actions', () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it('should call FETCH_SEARCH_SUCCESS with payload', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          results: [
            {
              name: 'name',
            },
          ],
        },
      });
    });

    const expectedActions = [
      {
        payload: { data: { results: [{ name: 'name' }] }, inputSearch: 'name' },
        type: types.FETCH_SEARCH_SUCCESS,
      },
    ];

    const store = mockStore({});

    return store.dispatch(fetchSearch('name')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return false if we try call search with empty input', () => {
    const store = mockStore({});

    expect(store.dispatch(fetchSearch(''))).toEqual(false);
  });

  it('should call FETCH_SEARCH_ERROR in fetchSearch', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: { error },
      });
    });

    const expectedActions = [
      {
        payload: {
          error: error,
        },
        type: types.FETCH_SEARCH_ERROR,
      },
    ];

    const store = mockStore({});

    return store.dispatch(fetchSearch('name')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should call FETCH_SEARCH_ERROR in fetchResultsSearch', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: { error },
      });
    });

    const expectedActions = [
      {
        payload: {
          error: error,
        },
        type: types.FETCH_SEARCH_ERROR,
      },
    ];

    const store = mockStore({});

    return store.dispatch(fetchResultsSearch('name')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should call FETCH_SEARCH_ERROR in fetchByGenre', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: { error },
      });
    });

    const expectedActions = [
      {
        payload: {
          error: error,
        },
        type: types.FETCH_SEARCH_ERROR,
      },
    ];

    const store = mockStore({
      search: {
        movie_page: 'movie_page',
      },
    });

    return store.dispatch(fetchByGenre(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should call FETCH_SEARCH_ERROR in fetchByKeyword', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: { error },
      });
    });

    const expectedActions = [
      {
        payload: {
          error: error,
        },
        type: types.FETCH_SEARCH_ERROR,
      },
    ];

    const store = mockStore({
      search: {
        movie_page: 'movie_page',
      },
    });

    return store.dispatch(fetchByKeyword(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should call FETCH_RESULT_SEARCH_SUCCESS with payload', () => {
    const promisesList = [
      { data: [] },
      { data: [] },
      { data: [] },
      {
        genres: [
          {
            id: 1,
            name: 'name',
          },
        ],
      },
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
      {
        payload: {
          movie: { data: [] },
          person: { data: [] },
          tv: { data: [] },
          genre: {
            1: 'name',
          },
        },
        type: types.FETCH_RESULT_SEARCH_SUCCESS,
      },
    ];

    const store = mockStore({});

    return store.dispatch(fetchResultsSearch('name')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should call FETCH_RESULT_SEARCH_SUCCESS with payload when u try to fetch genre', () => {
    const promisesList = [
      {
        results: [
          {
            name: 'name',
          },
        ],
      },
      {
        genres: [
          {
            id: 1,
            name: 'name',
          },
        ],
      },
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
      {
        payload: {
          genre: { '1': 'name' },
          movie: { results: [{ name: 'name' }] },
          person: null,
          tv: null,
        },
        type: 'FETCH_RESULT_SEARCH_SUCCESS',
      },
    ];

    const store = mockStore({
      search: {
        movie_page: 'movie_page',
      },
    });

    return store.dispatch(fetchByGenre(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should call FETCH_RESULT_SEARCH_SUCCESS with payload when u try to fetch by keyword', () => {
    const promisesList = [
      {
        results: [
          {
            name: 'name',
          },
        ],
      },
      {
        genres: [
          {
            id: 1,
            name: 'name',
          },
        ],
      },
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
      {
        payload: {
          genre: { '1': 'name' },
          movie: { results: [{ name: 'name' }] },
          person: null,
          tv: null,
        },
        type: 'FETCH_RESULT_SEARCH_SUCCESS',
      },
    ];

    const store = mockStore({
      search: {
        movie_page: 'movie_page',
      },
    });

    return store.dispatch(fetchByKeyword(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
