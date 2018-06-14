import DashboardComponent from './DashboardComponent';
import { connect } from 'react-redux';
import { fetchPopularMovies } from '../../actions/Dashboard';
import { fetchSearch, clearSearch } from '../../actions/Search';

const mapStateToProps = ({ dashboard, search }) => ({
  popular: dashboard.popular,
  search: search.data.results,
  total_results: dashboard.total_results,
  error: dashboard.error,
});

const mapDispatchToProps = dispatch => ({
  fetchPopularMovies() {
    dispatch(fetchPopularMovies());
  },
  fetchSearch(name) {
    dispatch(fetchSearch(name));
  },
  clearSearch() {
    dispatch(clearSearch());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardComponent);
