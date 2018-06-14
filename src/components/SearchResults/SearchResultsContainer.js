import SearchResultsComponent from './SearchResultsComponent';
import { connect } from 'react-redux';
import {
  fetchResultsSearch,
  fetchByGenre,
  clearSearch,
} from '../../actions/Search';

const mapStateToProps = ({ search }) => ({
  data: search,
  movie_results: search.movie_results,
});

const mapDispatchToProps = dispatch => ({
  fetchResultsSearch(name) {
    dispatch(fetchResultsSearch(name));
  },
  fetchByGenre(id) {
    dispatch(fetchByGenre(id));
  },
  clearSearch() {
    dispatch(clearSearch());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultsComponent);
