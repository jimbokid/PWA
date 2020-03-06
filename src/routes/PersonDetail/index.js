import PersonDetail from './components/PersonDetail';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { fetchDetailPerson, cleanPersonPage } from './actions/PersonDetail';

const mapStateToProps = ({ persondetail }) => ({
  data: persondetail.data,
  movies: persondetail.movies,
  isLoading: persondetail.isLoading,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      fetchDetailPerson,
      cleanPersonPage,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonDetail);
