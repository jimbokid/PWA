import PersonDetailComponent from './PersonDetailComponent';
import { connect } from 'react-redux';
import { fetchDetailPerson, cleanPersonPage } from '../../actions/PersonDetail';

const mapStateToProps = ({ persondetail }) => ({
  data: persondetail.data,
  movies: persondetail.movies,
  isLoading: persondetail.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchDetailPerson(id) {
    dispatch(fetchDetailPerson(id));
  },
  cleanPersonPage() {
    dispatch(cleanPersonPage());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonDetailComponent);
