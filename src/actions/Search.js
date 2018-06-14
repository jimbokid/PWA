import axios from 'axios';
import {
  API_TOKEN,
  INCLUDE_ADULT,
  LANGUAGE,
  REGION,
  API_PATH,
} from '../constants/appConstants';
import {
  SEARCH,
  SEARCH_MOVIE,
  SEARCH_PERSON,
  SEARCH_TV,
} from '../constants/dashboard';

export const types = {
  FETCH_SEARCH_START: 'FETCH_SEARCH_START',
  FETCH_SEARCH_SUCCESS: 'FETCH_SEARCH_SUCCESS',
  FETCH_SEARCH_ERROR: 'FETCH_SEARCH_ERROR',
  CLEAR_SEATCH_RESSULTS: 'CLEAR_SEATCH_RESSULTS',
  FETCH_RESULT_SEARCH_START: 'FETCH_RESULT_SEARCH_START',
  FETCH_RESULT_SEARCH_SUCCESS: 'FETCH_RESULT_SEARCH_SUCCESS',
};

export const fetchSearchSuccess = (data, inputSearch) => ({
  type: types.FETCH_SEARCH_SUCCESS,
  payload: { data, inputSearch },
});

export const fetchSearchError = error => ({
  type: types.FETCH_SEARCH_ERROR,
  payload: {
    error,
  },
});

export const clearSearch = () => ({
  type: types.CLEAR_SEATCH_RESSULTS,
});

export const fetchResultsSearchSuccess = (movie, tv, person) => ({
  type: types.FETCH_RESULT_SEARCH_SUCCESS,
  payload: {
    movie,
    tv,
    person,
  },
});

export const fetchSearch = name => dispatch => {
  if (name.length === 0) {
    return false;
  }
  return axios
    .get(`${SEARCH}`, {
      params: {
        api_key: API_TOKEN,
        language: LANGUAGE,
        region: REGION,
        query: name,
        include_adult: INCLUDE_ADULT,
      },
    })
    .then(res => {
      dispatch(fetchSearchSuccess(res.data, name));
      return res;
    })
    .catch(error => {
      dispatch(fetchSearchError(error));
      return error;
    });
};

export const fetchResultsSearch = name => dispatch => {
  const url = [SEARCH_MOVIE, SEARCH_TV, SEARCH_PERSON];

  const promises = url.map(item => {
    return axios.get(item, {
      params: {
        api_key: API_TOKEN,
        language: LANGUAGE,
        query: name,
      },
    });
  });

  return axios
    .all(promises)
    .then(
      axios.spread((movie, tv, person) => {
        dispatch(fetchResultsSearchSuccess(movie.data, tv.data, person.data));
        return [movie, tv, person];
      }),
    )
    .catch(error => {
      dispatch(fetchSearchError(error));
      return error;
    });
};

export const fetchByGenre = id => (dispatch, getState) => {
  const store = getState();
  const { movie_page } = store.search;

  return axios
    .get(`${API_PATH}genre/${id}/movies`, {
      params: {
        api_key: API_TOKEN,
        language: LANGUAGE,
        page: movie_page,
        region: REGION,
        include_adult: INCLUDE_ADULT,
      },
    })
    .then(res => {
      dispatch(fetchResultsSearchSuccess(res.data, null, null));
      return res;
    })
    .catch(error => {
      dispatch(fetchSearchError(error));
      return error;
    });
};
