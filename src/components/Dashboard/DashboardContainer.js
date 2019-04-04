import DashboardComponent from './DashboardComponent';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchPopularMovies} from '../../actions/Dashboard';
import {fetchSearch, clearSearch} from '../../actions/Search';

const mapStateToProps = ({dashboard, search}) => ({
  popular: dashboard.popular,
  search: search.data.results,
  total_results: dashboard.total_results,
  error: dashboard.error,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      fetchPopularMovies,
      fetchSearch,
      clearSearch,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardComponent);
