import { types } from '../actions/PersonDetail';

export const defaultState = {
  data: {},
  isLoading: false,
  error: null,
  movies: [],
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case types.FETCH_PERSON_DETAIL_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.FETCH_PERSON_DETAIL_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        movies: payload.movies,
        isLoading: false,
      };
    }

    case types.FETCH_PERSON_DETAIL_ERROR: {
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };
    }
    case types.CLEAN_PERSON_DETAIL: {
      return {
        ...state,
        data: defaultState.data,
      };
    }
    default:
      return { ...state };
  }
};
