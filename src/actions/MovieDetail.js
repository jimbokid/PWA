import axios from 'axios';
import { API_TOKEN, API_PATH, LANGUAGE } from '../constants/appConstants';

export const types = {
  FETCH_MOVIE_DETAIL_START: 'FETCH_MOVIE_DETAIL_START',
  FETCH_MOVIE_DETAIL_SUCCESS: 'FETCH_MOVIE_DETAIL_SUCCESS',
  FETCH_MOVIE_DETAIL_ERROR: 'FETCH_MOVIE_DETAIL_ERROR',
  CLEAN_MOVIE_DETAIL: 'CLEAN_MOVIE_DETAIL',
};

export const fetchDetailMovieStart = () => ({
  type: types.FETCH_MOVIE_DETAIL_START,
});

export const fetchDetailMovieSuccess = (
  data,
  similar,
  credits,
  images,
  genreList,
) => ({
  type: types.FETCH_MOVIE_DETAIL_SUCCESS,
  payload: { data, similar, credits, images, genreList },
});

export const fetchDetailMovieError = error => ({
  type: types.FETCH_MOVIE_DETAIL_ERROR,
  payload: {
    error,
  },
});

export const cleanDetailPage = () => ({
  type: types.CLEAN_MOVIE_DETAIL,
});

export const fetchDetailMovie = (id, type) => dispatch => {
  dispatch(fetchDetailMovieStart());
  const url = [
    `${API_PATH}${type}/${id}`,
    `${API_PATH}${type}/${id}/similar`,
    `${API_PATH}${type}/${id}/credits`,
    `${API_PATH}${type}/${id}/images`,
    `${API_PATH}genre/movie/list`,
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
      axios.spread((movie, similar, credits, images, genre) => {
        let genreList = {};

        genre.data.genres.forEach(item => {
          genreList[item.id] = item.name;
        });



        dispatch(
          fetchDetailMovieSuccess(
            movie.data,
            similar.data,
            credits.data,
            images.data,
            genreList,
          ),
        );
        return [movie, similar, credits, images, genre];
      }),
    )
    .catch(error => {
      dispatch(fetchDetailMovieError(error));
      return error;
    });
};
