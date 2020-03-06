import MovieDetail from './components/MovieDetail';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchDetailMovie, cleanDetailPage} from './actions/MovieDetail';

const mapStateToProps = ({moviedetail}) => ({
  data: moviedetail.data,
  similar: moviedetail.similar,
  genres: moviedetail.genres,
  isLoading: moviedetail.isLoading,
  credits: moviedetail.credits,
  error: moviedetail.error,
  videos: moviedetail.videos,
  keywords: moviedetail.keywords,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      fetchDetailMovie,
      cleanDetailPage,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieDetail);
