import { types } from '../actions/Search';

export const defaultState = {
  data: {
    results: [],
  },
  searchResults: {
    movie: {
      results: [],
    },
  },
  genre: {},
  movie_results: 0,
  movie_page: 1,
  error: null,
  isLoading: false,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case types.FETCH_SEARCH_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        error: null,
        isLoading: false,
      };
    }
    case types.CLEAR_SEATCH_RESSULTS: {
      return {
        ...state,
        ...defaultState,
      };
    }

    case types.FETCH_SEARCH_START: {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    }

    case types.FETCH_SEARCH_ERROR: {
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };
    }

    case types.FETCH_RESULT_SEARCH_SUCCESS: {
      return {
        ...state,
        searchResults: {
          movie: {
            ...state.searchResults.movie,
            results: state.searchResults.movie.results.concat(
              payload.movie.results,
            ),
          },
          tv: payload.tv,
          person: payload.person,
        },
        movie_page: payload.movie.page + 1,
        movie_pages: payload.movie.total_pages,
        movie_results: payload.movie.total_results,
        genre: payload.genre,
        error: null,
        isLoading: false,
      };
    }
    default:
      return { ...state };
  }
};
