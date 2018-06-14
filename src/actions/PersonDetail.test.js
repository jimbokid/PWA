import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { types, fetchDetailPerson } from './PersonDetail';

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

describe('PersonDetail actions', () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it('should call FETCH_PERSON_DETAIL_SUCCESS with payload', () => {
    const promisesList = [
      { data: {} },
      {
        cast: [
          {
            popularity: 0,
          },
          {
            popularity: 1,
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
      { type: types.FETCH_PERSON_DETAIL_START },
      {
        payload: {
          data: { data: {} },
          movies: [{ popularity: 1 }, { popularity: 0 }],
        },
        type: types.FETCH_PERSON_DETAIL_SUCCESS,
      },
    ];

    const store = mockStore({});

    return store.dispatch(fetchDetailPerson()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should call FETCH_PERSON_DETAIL_ERROR ', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: { error },
      });
    });

    const expectedActions = [
      { type: types.FETCH_PERSON_DETAIL_START },
      {
        payload: {
          error: error,
        },
        type: types.FETCH_PERSON_DETAIL_ERROR,
      },
    ];

    const store = mockStore({});

    return store.dispatch(fetchDetailPerson()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
