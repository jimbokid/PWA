import {combineReducers} from 'redux';
import dashboard from '../../routes/Dashboard/reducer/dashboard';
import moviedetail from '../../routes/MovieDetail/reducer/moviedetail';
import search from '../../routes/SearchResults/reducer/search';
import persondetail from '../../routes/PersonDetail/reducer/persondetail';

const appReducer = combineReducers({
  dashboard,
  moviedetail,
  search,
  persondetail,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
