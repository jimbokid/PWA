import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Layout from '../../shared/Layout';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import deepOrange from '@material-ui/core/colors/deepOrange';
import grey from '@material-ui/core/colors/grey';
import CameraAlt from '@material-ui/icons/CameraAlt';
import InfiniteScroll from 'react-infinite-scroll-component';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';

const styles = theme => ({
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: `0 1px ${theme.spacing.unit}px`,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '40%',
    backgroundColor: grey[200],
    paddingTop: '61%',
    height: '0',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  item: {
    textDecoration: 'none',
  },
  avatar: {
    color: '#fff',
    backgroundColor: deepOrange[500],
    fontSize: 14,
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 'auto',
  },
  chip: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    height: 26,
    cursor: 'pointer',
  },
});

export const MovieWrapper = ({ movie, classes, genres }) => {
  return (
    <React.Fragment>
      <Typography variant="title" gutterBottom>
        Movies
      </Typography>
      {movie &&
        movie.results.map((item, key) => {
          const date = moment(item.release_date).format('MMM Do YYYY');

          return (
            <Link
              to={`/moviedetail/movie/${item.id}`}
              className={classes.item}
              aria-label="movie detail page"
              key={key}
            >
              <Card className={classes.card}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography variant="title" gutterBottom>
                      {item.original_title}
                    </Typography>

                    <Typography variant="subheading" color="textSecondary">
                      {date}
                    </Typography>
                    {item.genre_ids.map((inner, key) => {
                      return (
                        <Chip
                          label={genres[inner]}
                          className={classes.chip}
                          key={key}
                        />
                      );
                    })}

                    <Avatar className={classes.avatar}>
                      {item.vote_average}
                    </Avatar>
                  </CardContent>
                </div>

                <div className={classes.cover}>
                  {item.poster_path ? (
                    <CardMedia
                      className={classes.image}
                      image={`https://image.tmdb.org/t/p/w300/${
                        item.poster_path
                      }`}
                      title="Live from space album cover"
                    />
                  ) : (
                    <CameraAlt />
                  )}
                </div>
              </Card>
            </Link>
          );
        })}
    </React.Fragment>
  );
};

export class SearchResultsComponent extends React.Component {
  componentWillMount() {
    const {
      match,
      fetchResultsSearch,
      fetchByGenre,
      fetchByKeyword,
    } = this.props;
    const movieName = match.params.id;
    const searchType = match.params.searchType;

    switch (searchType) {
      case 'searchByName':
        fetchResultsSearch(movieName);
        break;
      case 'searchByGenre':
        fetchByGenre(movieName);
        break;
      case 'searchByKeyword':
        fetchByKeyword(movieName);
        break;
      default:
        return false;
    }
  }

  componentWillUnmount() {
    const { clearSearch } = this.props;
    clearSearch();
  }

  render() {
    const {
      classes,
      match,
      fetchByGenre,
      fetchByKeyword,
      movie_results,
      genres,
    } = this.props;
    const { movie, tv, person } = this.props.data.searchResults;

    const { searchType, genreName, id } = match.params;

    let title = '';
    switch (searchType) {
      case 'searchByName':
        break;
      case 'searchByGenre':
        title = `Best in "${genreName}" genre`;
        break;
      case 'searchByKeyword':
        title = `Best by "${genreName}" keyword`;
        break;
      default:
        title = null;
    }

    return (
      <Layout>
        {title.length > 0 && (
          <Typography variant="title" gutterBottom>
            {title}
          </Typography>
        )}
        {movie &&
          movie.results.length > 0 && (
            <div id="movieWrapper">
              {searchType === 'searchByGenre' ||
              searchType === 'searchByKeyword' ? (
                <InfiniteScroll
                  dataLength={movie.results.length}
                  next={() => {
                    if (searchType === 'searchByGenre') {
                      fetchByGenre(id);
                    } else {
                      fetchByKeyword(id);
                    }
                  }}
                  hasMore={movie.results.length < movie_results}
                >
                  <MovieWrapper
                    movie={movie}
                    classes={classes}
                    genres={genres}
                  />
                </InfiniteScroll>
              ) : (
                <MovieWrapper
                  movie={movie}
                  classes={classes}
                  id={'test'}
                  genres={genres}
                />
              )}
            </div>
          )}

        {tv &&
          tv.results.length > 0 && (
            <div id="tvWrapper">
              <Typography variant="title" gutterBottom>
                Tv show
              </Typography>
              {tv &&
                tv.results.map((item, key) => {
                  const date = moment(item.release_date).format('MMM Do YYYY');
                  return (
                    <Card className={classes.card} key={key}>
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <Link
                            to={`/moviedetail/tv/${item.id}`}
                            className={classes.item}
                            aria-label="movie detail page"
                          >
                            <Typography variant="title" gutterBottom>
                              {item.name}
                            </Typography>
                          </Link>
                          <Typography variant="body2" color="textSecondary">
                            {date}
                          </Typography>
                          <Avatar>{item.vote_average}</Avatar>
                        </CardContent>
                      </div>
                      <CardMedia
                        className={classes.cover}
                        image={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${
                          item.poster_path
                        }`}
                        title="Live from space album cover"
                      />
                    </Card>
                  );
                })}
            </div>
          )}

        {person &&
          person.results.length > 0 && (
            <div id="personWrapper">
              <Typography variant="title" gutterBottom>
                Person
              </Typography>
              {person &&
                person.results.map((item, key) => {
                  return (
                    <Card className={classes.card} key={key}>
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <Link
                            to={`/persondetail/${item.id}`}
                            className={classes.item}
                            aria-label="person detail page"
                          >
                            <Typography variant="title" gutterBottom>
                              {item.name}
                            </Typography>
                          </Link>
                          <Avatar>{item.vote_average}</Avatar>
                        </CardContent>
                      </div>
                      <div className={classes.cover}>
                        {item.profile_path ? (
                          <CardMedia
                            className={classes.image}
                            image={`https://image.tmdb.org/t/p/w300/${
                              item.profile_path
                            }`}
                            title="Live from space album cover"
                          />
                        ) : (
                          <CameraAlt className={classes.icon} />
                        )}
                      </div>
                    </Card>
                  );
                })}
            </div>
          )}
      </Layout>
    );
  }
}

SearchResultsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  fetchByGenre: PropTypes.func.isRequired,
  fetchByKeyword: PropTypes.func.isRequired,
  movie_results: PropTypes.number.isRequired,
  genres: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchResultsComponent);
