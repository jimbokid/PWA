import * as React from 'react';
import Layout from '../../shared/Layout';
import ErrorMessage from '../../shared/ErrorMessage';
import { withStyles } from '@material-ui/core/styles';
import MovieList from '../../shared/MovieList';
import SearchField from '../../shared/SearchField';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';

const styles = theme => ({
  card: {
    height: '100%',
  },
  cardInner: {
    padding: `0 ${theme.spacing.unit}px`,
    width: '50%',
    display: 'block',
    marginBottom: theme.spacing.unit,
    cursor: 'pointer',
  },
  media: {
    height: 0,
    paddingTop: '150%', // 16:9
  },
  infoWrapper: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  poster: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: 'auto',
    width: '100%',
  },
  searchWrapper: {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    background: '#fff',
  },
});

export class DashboardComponent extends React.Component {
  componentDidMount() {
    const { fetchPopularMovies } = this.props;
    fetchPopularMovies();
  }

  componentWillUnmount() {
    const { clearSearch } = this.props;
    clearSearch();
  }

  render() {
    const {
      classes,
      popular,
      fetchSearch,
      fetchPopularMovies,
      search,
      clearSearch,
      total_results,
      error,
    } = this.props;

    if (error) {
      return <ErrorMessage error={error} id={'errorWrapper'} />;
    }

    return (
      <Layout>
        <div className={classes.cardLayout}>
          <div className={classes.searchWrapper}>
            <SearchField
              fetchSearch={fetchSearch}
              data={search}
              clearSearch={clearSearch}
            />
          </div>
          <InfiniteScroll
            dataLength={popular.results.length}
            next={fetchPopularMovies}
            hasMore={popular.results.length < total_results}
          >
            <MovieList data={popular.results} inline={false} type={'movie'} />
          </InfiniteScroll>
        </div>
      </Layout>
    );
  }
}

DashboardComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  popular: PropTypes.object.isRequired,
  fetchSearch: PropTypes.func.isRequired,
  fetchPopularMovies: PropTypes.func.isRequired,
  search: PropTypes.array.isRequired,
  clearSearch: PropTypes.func.isRequired,
  total_results: PropTypes.number,
  error: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};

export default withStyles(styles)(DashboardComponent);
