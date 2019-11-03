import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../../shared/Layout';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import MovieList from '../../shared/MovieList';
import moment from 'moment';
import WithLoader from '../../shared/WithLoader';
import ErrorMessage from '../../shared/ErrorMessage';
import TitleTextComponent from '../../shared/TitleTextComponent';
import GenreList from '../../shared/GenreList';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import YouTube from 'react-youtube';
import Button from '@material-ui/core/Button';
import { MyContext } from '../../shared/Auth';
import {
  addToFavorite,
  removeFromFavorite,
} from '../../utils/componentHelpers';
import { Link } from 'react-router-dom';

const styles = theme => ({
  media: {
    height: 0,
    paddingTop: '150%',
    background: '#949494',
  },
  movieInfo: {
    background: 'rgba(255,255,255,.8)',
    padding: '16px 8px',
  },
  movieTitle: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.8)',
    padding: 15,
    textAlign: 'center',
  },
  cardInner: {
    padding: `0 ${theme.spacing.unit}px`,
    width: '50%',
    display: 'block',
    marginBottom: theme.spacing.unit,
    cursor: 'pointer',
  },
  chip: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    height: 26,
    cursor: 'pointer',
  },
  chipWrapper: {
    textDecoration: 'none',
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
  gridList: {
    width: '100%',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  infoWrapper: {
    paddingTop: theme.spacing.unit,
  },
  youTubeWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: 'auto',
    width: '100%',
  },
  videoInner: {
    height: 0,
    paddingTop: '56%',
    position: 'relative',
    width: '100%',
    marginBottom: theme.spacing.unit,
  },
  videoWrapper: {
    flexWrap: 'wrap',
  },
  panelWrapper: {
    marginBottom: theme.spacing.unit,
  },
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

export const Wrapper = styled.div`
  background: #949494 URL(https://image.tmdb.org/t/p/w1400_and_h450_face${props =>
    props.backdrop_path});
  background-size: cover;
  background-position: center center;
  margin: -32px -16px 0;
  padding-top: 56.25%;
  position: relative;
`;

export const VideoWrapper = ({
  data,
  classes,
  handleVideo,
  openVideo,
  showVideoClicked,
}) => {
  return (
    <ExpansionPanel expanded={openVideo} className={classes.panelWrapper}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={handleVideo}
        id="openVideoWrapper"
      >
        <Typography className={classes.heading}>
          {openVideo ? 'Hide video' : 'Show video'}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.videoWrapper}>
        {data.map((item, key) => {
          return (
            <React.Fragment key={key}>
              {(openVideo || showVideoClicked) && (
                <div className={classes.videoInner}>
                  <YouTube
                    className={classes.youTubeWrapper}
                    videoId={item.key}
                    opts={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export class MovieDetailComponent extends React.PureComponent {
  state = {
    openVideo: false,
    showVideoClicked: false,
    id: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.id !== state.id) {
      const { fetchDetailMovie } = props;
      const { id, type } = props.match.params;
      fetchDetailMovie(id, type);
      window.scrollTo(0, 0);
      return {
        openVideo: false,
        showVideoClicked: false,
        id: id,
      };
    }
    return null;
  }

  componentWillUnmount() {
    const { cleanDetailPage } = this.props;
    cleanDetailPage();
    this.setState({
      openVideo: false,
      showVideoClicked: false,
    });
  }

  handleVideo() {
    this.setState({
      openVideo: !this.state.openVideo,
      showVideoClicked: true,
    });
  }
  render() {
    const {
      data,
      classes,
      similar,
      credits,
      match,
      genres,
      isLoading,
      error,
      videos,
      keywords,
    } = this.props;
    const { type } = match.params;

    if (error) {
      return <ErrorMessage error={error} id={'errorWrapper'} />;
    }

    return (
      <Layout>
        <WithLoader isLoading={isLoading}>
          <React.Fragment>
            <div className={classes.movieInfo}>
              <Wrapper {...data}>
                <Typography variant="display1" className={classes.movieTitle}>
                  {data.title || data.original_name}
                </Typography>
              </Wrapper>
              <div className={classes.infoWrapper}>
                <GenreList
                  data={data.genres}
                  genres={genres}
                  searchBy={'searchByGenre'}
                  title={'Genres'}
                />
                <GenreList
                  data={keywords}
                  searchBy={'searchByKeyword'}
                  title={'Keywords'}
                />

                <Typography variant="title" gutterBottom>
                  Add to favorite:
                </Typography>

                <MyContext.Consumer>
                  {context => {
                    if (context.state.isSignedIn === false) {
                      return (
                        <React.Fragment>
                          <Typography gutterBottom>
                            You need to be authorized
                          </Typography>
                          <Link
                            to={`/profile/`}
                            style={{ textDecoration: 'none' }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                            >
                              Login
                            </Button>
                          </Link>
                        </React.Fragment>
                      );
                    }
                    if (
                      context.state.isSignedIn === null ||
                      context.state.favorites === null ||
                      type !== 'movie'
                    ) {
                      return false;
                    }

                    const id = match.params.id;
                    let isFavorite = false;
                    let recordId = null;

                    context.state.favorites.forEach(item => {
                      if (item.id === parseInt(id, 0)) {
                        isFavorite = true;
                        recordId = item.recordId;
                        return false;
                      }
                    });
                    return (
                      <React.Fragment>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          onClick={() => {
                            isFavorite
                              ? removeFromFavorite(
                                  context.state.userUid,
                                  recordId,
                                )
                              : addToFavorite(context.state.userUid, data);
                          }}
                        >
                          {isFavorite
                            ? 'Remove from favorite'
                            : 'Add to favorite'}
                        </Button>
                      </React.Fragment>
                    );
                  }}
                </MyContext.Consumer>
                <TitleTextComponent
                  title={'Vote average:'}
                  text={data.vote_average}
                />
                <TitleTextComponent
                  title={'Release Date:'}
                  text={
                    (data.release_date &&
                      moment(data.release_date).format('MMM DD YYYY')) ||
                    (data.first_air_date &&
                      moment(data.first_air_date).format('MMM DD YYYY'))
                  }
                />
                <TitleTextComponent title={'Overview:'} text={data.overview} />
                <VideoWrapper
                  classes={classes}
                  data={videos.results}
                  handleVideo={this.handleVideo.bind(this)}
                  openVideo={this.state.openVideo}
                  showVideoClicked={this.state.showVideoClicked}
                  id="parrentVideoWrapper"
                />
                <Typography variant="title" gutterBottom>
                  Cast:
                </Typography>
                {credits && (
                  <MovieList
                    data={credits.cast}
                    inline={true}
                    type={type}
                    cast={true}
                    cols={2.2}
                  />
                )}
                <Typography variant="title" gutterBottom>
                  You can also watch:
                </Typography>
                {similar && (
                  <MovieList
                    data={similar.results}
                    inline={true}
                    type={type}
                    cols={1.5}
                  />
                )}
              </div>
            </div>
          </React.Fragment>
        </WithLoader>
      </Layout>
    );
  }
}

MovieDetailComponent.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  similar: PropTypes.object.isRequired,
  credits: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  genres: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  videos: PropTypes.object.isRequired,
  keywords: PropTypes.array.isRequired,
  cleanDetailPage: PropTypes.func
};

VideoWrapper.propTypes = {
  data: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  handleVideo: PropTypes.func.isRequired,
  openVideo: PropTypes.bool.isRequired,
  showVideoClicked: PropTypes.bool.isRequired,
};

export default withStyles(styles)(MovieDetailComponent);
