import SearchResults from './components/SearchResults';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {
  fetchResultsSearch,
  fetchByGenre,
  fetchByKeyword,
  clearSearch,
} from './actions/Search';

const mapStateToProps = ({ search }) => ({
  data: search,
  movie_results: search.movie_results,
  genres: search.genre,
  isLoading: search.isLoading,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      fetchResultsSearch,
      fetchByGenre,
      fetchByKeyword,
      clearSearch
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResults);
