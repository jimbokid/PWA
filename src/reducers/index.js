import { combineReducers } from 'redux';
import dashboard from './dashboard';
import moviedetail from './moviedetail';
import search from './search';
import persondetail from './persondetail';

export default combineReducers({
  dashboard,
  moviedetail,
  search,
  persondetail,
});
