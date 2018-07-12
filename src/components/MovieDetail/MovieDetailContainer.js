import MovieDetailComponent from './MovieDetailComponent';
import { connect } from 'react-redux';
import { fetchDetailMovie, cleanDetailPage } from '../../actions/MovieDetail';

const mapStateToProps = ({ moviedetail }) => ({
  data: moviedetail.data,
  similar: moviedetail.similar,
  genres: moviedetail.genres,
  isLoading: moviedetail.isLoading,
  credits: moviedetail.credits,
  error: moviedetail.error,
  videos: moviedetail.videos,
});

const mapDispatchToProps = dispatch => ({
  fetchDetailMovie(id, type) {
    dispatch(fetchDetailMovie(id, type));
  },
  cleanDetailPage() {
    dispatch(cleanDetailPage());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieDetailComponent);
