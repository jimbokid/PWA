import SearchResultsComponent from './SearchResultsComponent';
import { connect } from 'react-redux';
import {
  fetchResultsSearch,
  fetchByGenre,
  fetchByKeyword,
  clearSearch,
} from '../../actions/Search';

const mapStateToProps = ({ search }) => ({
  data: search,
  movie_results: search.movie_results,
  genres: search.genre,
});

const mapDispatchToProps = dispatch => ({
  fetchResultsSearch(name) {
    dispatch(fetchResultsSearch(name));
  },
  fetchByGenre(id) {
    dispatch(fetchByGenre(id));
  },
  fetchByKeyword(keyword) {
    dispatch(fetchByKeyword(keyword));
  },
  clearSearch() {
    dispatch(clearSearch());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultsComponent);
