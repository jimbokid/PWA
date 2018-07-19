import { types } from '../actions/MovieDetail';

export const defaultState = {
  data: {},
  isLoading: false,
  error: null,
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
  genres: [],
  keywords: [],
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case types.FETCH_MOVIE_DETAIL_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case types.FETCH_MOVIE_DETAIL_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        credits: payload.credits,
        similar: payload.similar,
        images: payload.images,
        genres: payload.genreList,
        videos: payload.videos,
        keywords: payload.keywords,
        isLoading: false,
        error: null,
      };
    }

    case types.FETCH_MOVIE_DETAIL_ERROR: {
      return {
        ...state,
        error: payload.error,
      };
    }

    case types.CLEAN_MOVIE_DETAIL: {
      return {
        ...state,
        data: defaultState.data,
        similar: defaultState.similar,
        credits: defaultState.credits,
      };
    }
    default:
      return { ...state };
  }
};
