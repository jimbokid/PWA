import { types } from '../actions/Dashboard';

export const defaultState = {
  popular: {
    results: [],
  },
  page: 1,
  total_pages: null,
  total_results: null,
  error: null,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case types.FETCH_POPULAR_SUCCESS: {
      return {
        ...state,
        popular: {
          ...state.popular,
          results: state.popular.results.concat(payload.data.results),
        },
        page: payload.data.page + 1,
        total_pages: payload.data.total_pages,
        total_results: payload.data.total_results,
        error: null,
      };
    }

    case types.FETCH_POPULAR_ERROR: {
      return {
        ...state,
        error: payload.error,
      };
    }
    default:
      return { ...state };
  }
};
