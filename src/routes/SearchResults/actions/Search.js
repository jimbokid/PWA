import axios from 'axios';
import {
  API_TOKEN,
  INCLUDE_ADULT,
  LANGUAGE,
  REGION,
  API_PATH,
} from '../../../constants/appConstants';
import { genreGroup } from '../../../utils/actionHelpers';

export const types = {
  FETCH_SEARCH_START: 'FETCH_SEARCH_START',
  FETCH_SEARCH_SUCCESS: 'FETCH_SEARCH_SUCCESS',
  FETCH_SEARCH_ERROR: 'FETCH_SEARCH_ERROR',
  CLEAR_SEATCH_RESSULTS: 'CLEAR_SEATCH_RESSULTS',
  FETCH_RESULT_SEARCH_START: 'FETCH_RESULT_SEARCH_START',
  FETCH_RESULT_SEARCH_SUCCESS: 'FETCH_RESULT_SEARCH_SUCCESS',
};

export const fetchSearchStart = () => ({
  type: types.FETCH_SEARCH_START,
});

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

export const fetchResultsSearchSuccess = (movie, tv, person, genre) => ({
  type: types.FETCH_RESULT_SEARCH_SUCCESS,
  payload: {
    movie,
    tv,
    person,
    genre,
  },
});

export const fetchSearch = name => dispatch => {
  if (name.length === 0) {
    return false;
  }
  dispatch(fetchSearchStart());
  return axios
    .get(`${API_PATH}search/multi`, {
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
  const url = [
    `${API_PATH}search/movie`,
    `${API_PATH}search/tv`,
    `${API_PATH}search/person`,
    `${API_PATH}genre/movie/list`,
  ];

  const promises = url.map(item => {
    return axios.get(item, {
      params: {
        api_key: API_TOKEN,
        language: LANGUAGE,
        query: name,
      },
    });
  });

  dispatch(fetchSearchStart());

  return axios
    .all(promises)
    .then(
      axios.spread((movie, tv, person, genre) => {
        let genreList = {};

        genre.data.genres.forEach(item => {
          genreList[item.id] = item.name;
        });
        dispatch(
          fetchResultsSearchSuccess(
            movie.data,
            tv.data,
            person.data,
            genreList,
          ),
        );
        return [movie, tv, person, genre];
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

  const url = [`${API_PATH}genre/${id}/movies`, `${API_PATH}genre/movie/list`];

  const promises = url.map(item => {
    return axios.get(item, {
      params: {
        api_key: API_TOKEN,
        language: LANGUAGE,
        page: movie_page,
        region: REGION,
        include_adult: INCLUDE_ADULT,
      },
    });
  });
  dispatch(fetchSearchStart());

  return axios
    .all(promises)
    .then(
      axios.spread((res, genre) => {
        const genreList = genreGroup(genre.data.genres);

        dispatch(fetchResultsSearchSuccess(res.data, null, null, genreList));
        return [res, genre];
      }),
    )
    .catch(error => {
      dispatch(fetchSearchError(error));
      return error;
    });
};

export const fetchByKeyword = keyword_id => (dispatch, getState) => {
  const url = [
    `${API_PATH}keyword/${keyword_id}/movies`,
    `${API_PATH}genre/movie/list`,
  ];
  const store = getState();
  const { movie_page } = store.search;

  const promises = url.map(item => {
    return axios.get(item, {
      params: {
        api_key: API_TOKEN,
        language: LANGUAGE,
        region: REGION,
        page: movie_page,
        include_adult: INCLUDE_ADULT,
      },
    });
  });
  dispatch(fetchSearchStart());

  return axios
    .all(promises)
    .then(
      axios.spread((res, genre) => {
        const genreList = genreGroup(genre.data.genres);

        dispatch(fetchResultsSearchSuccess(res.data, null, null, genreList));
        return [res, genre];
      }),
    )
    .catch(error => {
      dispatch(fetchSearchError(error));
      return error;
    });
};
