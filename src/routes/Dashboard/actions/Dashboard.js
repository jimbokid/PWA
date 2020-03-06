import axios from 'axios';
import {
  API_TOKEN,
  CURRENT_YEAR,
  START_DATE_POPULAR,
  INCLUDE_ADULT,
  LANGUAGE,
  REGION,
  API_PATH
} from '../../../constants/appConstants';

export const types = {
  FETCH_POPULAR_START: 'FETCH_POPULAR_START',
  FETCH_POPULAR_SUCCESS: 'FETCH_POPULAR_SUCCESS',
  FETCH_POPULAR_ERROR: 'FETCH_POPULAR_ERROR',
};

export const fetchPopularSuccess = data => ({
  type: types.FETCH_POPULAR_SUCCESS,
  payload: { data },
});

export const fetchPopularError = error => ({
  type: types.FETCH_POPULAR_ERROR,
  payload: {
    error,
  },
});

export const fetchPopularMovies = () => (dispatch, getState) => {
  const store = getState();
  const { page } = store.dashboard;

  return axios
    .get(`${API_PATH}discover/movie`, {
      params: {
        api_key: API_TOKEN,
        language: LANGUAGE,
        region: REGION,
        sort_by: `popularity.desc`,
        include_adult: INCLUDE_ADULT,
        page: page,
        primary_release_year: CURRENT_YEAR,
        primary_release_date: { lte: START_DATE_POPULAR },
      },
    })
    .then(res => {
      dispatch(fetchPopularSuccess(res.data));
      return res;
    })
    .catch(error => {
      dispatch(fetchPopularError(error));
      return error;
    });
};
