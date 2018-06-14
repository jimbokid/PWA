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
  movie_page: 1,
  error: null,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case types.FETCH_SEARCH_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        error: null,
      };
    }
    case types.CLEAR_SEATCH_RESSULTS: {
      return {
        ...state,
        ...defaultState,
      };
    }

    case types.FETCH_SEARCH_ERROR: {
      return {
        ...state,
        error: payload.error,
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
        error: null,
      };
    }
    default:
      return { ...state };
  }
};
