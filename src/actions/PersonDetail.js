import axios from 'axios';
import { API_TOKEN, API_PATH, LANGUAGE } from '../constants/appConstants';

export const types = {
  FETCH_PERSON_DETAIL_START: 'FETCH_PERSON_DETAIL_START',
  FETCH_PERSON_DETAIL_SUCCESS: 'FETCH_PERSON_DETAIL_SUCCESS',
  FETCH_PERSON_DETAIL_ERROR: 'FETCH_PERSON_DETAIL_ERROR',
  CLEAN_PERSON_DETAIL: 'CLEAN_PERSON_DETAIL',
};

export const fetchDetailPersonStart = () => ({
  type: types.FETCH_PERSON_DETAIL_START,
});

export const fetchDetailPersonSuccess = (data, movies) => ({
  type: types.FETCH_PERSON_DETAIL_SUCCESS,
  payload: {
    data,
    movies,
  },
});

export const fetchDetailPersonError = error => ({
  type: types.FETCH_PERSON_DETAIL_ERROR,
  payload: { error },
});

export const cleanPersonPage = () => ({
  type: types.CLEAN_PERSON_DETAIL,
});

export const fetchDetailPerson = id => dispatch => {
  dispatch(fetchDetailPersonStart());

  const url = [
    `${API_PATH}person/${id}`,
    `${API_PATH}person/${id}/movie_credits`,
  ];

  const promises = url.map(item => {
    return axios.get(item, {
      params: {
        api_key: API_TOKEN,
        language: LANGUAGE,
      },
    });
  });

  return axios
    .all(promises)
    .then(
      axios.spread((detail, movies) => {
        const sortedMovies = movies.data.cast.sort((a, b) => {
          return b.popularity - a.popularity;
        });

        dispatch(fetchDetailPersonSuccess(detail.data, sortedMovies));
        return [detail, movies];
      }),
    )
    .catch(error => {
      dispatch(fetchDetailPersonError(error));
      return error;
    });
};
