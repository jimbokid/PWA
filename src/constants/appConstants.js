import moment from 'moment';

const packageJson = require('../../package.json');

export const API_TOKEN = '52168c89eccc87a8da1bbb7cc5f6b0dd';

export const API_PATH = `https://api.themoviedb.org/3/`;
export const CURRENT_YEAR = moment().format('YYYY');
export const START_DATE_POPULAR = moment()
  .subtract(1, 'months')
  .startOf('month');
export const INCLUDE_ADULT = false;
export const LANGUAGE = 'en-US';
export const REGION = 'US';

export const IMAGE_URL = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/';

export const APP_VERSION = packageJson.version + '.' + process.env.REACT_APP_CURRENT_GIT_NUMBER;
