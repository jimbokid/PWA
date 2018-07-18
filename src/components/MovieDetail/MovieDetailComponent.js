import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../../shared/Layout';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import MovieList from '../../shared/MovieList';
import moment from 'moment';
import WithLoader from '../../shared/WithLoader';
import VideoWrapper from '../../shared/VideoWrapper';
import ErrorMessage from '../../shared/ErrorMessage';
import TitleTextComponent from '../../shared/TitleTextComponent';
import GenreList from '../../shared/GenreList';

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
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  infoWrapper: {
    paddingTop: theme.spacing.unit,
  },
});

const Wrapper = styled.div`
  background: #949494 URL(https://image.tmdb.org/t/p/w1400_and_h450_face${props =>
    props.backdrop_path});
  background-size: cover;
  background-position: center center;
  margin: -32px -16px 0;
  padding-top: 56.25%;
  position: relative;
`;

export class MovieDetailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openVideo: false,
      showVideoClicked: false,
    };
  }

  componentWillMount() {
    const { match, fetchDetailMovie } = this.props;
    const { id, type } = match.params;
    fetchDetailMovie(id, type);
  }

  componentWillUnmount() {
    const { cleanDetailPage } = this.props;
    cleanDetailPage();
    window.scrollTo(0, 0);
    this.setState({
      openVideo: false,
      showVideoClicked: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const { fetchDetailMovie } = this.props;
      const { id, type } = nextProps.match.params;
      fetchDetailMovie(id, type);
      window.scrollTo(0, 0);
      this.setState({
        openVideo: false,
        showVideoClicked: false,
      });
    }
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
                  {' '}
                  {data.title || data.original_name}{' '}
                </Typography>{' '}
              </Wrapper>
              <div className={classes.infoWrapper}>
                <Typography variant="title" gutterBottom>
                  Genres:
                </Typography>{' '}
                <GenreList data={data.genres} genres={genres} />
                <TitleTextComponent
                  title={'Vote average:'}
                  text={data.vote_average}
                />
                <TitleTextComponent
                  title={'Release Date:'}
                  text={
                    data.release_date &&
                    moment(data.release_date).format('MMM DD YYYY')
                  }
                />
                <TitleTextComponent title={'Overview:'} text={data.overview} />
                <VideoWrapper
                  data={videos.results}
                  handleVideo={this.handleVideo.bind(this)}
                  openVideo={this.state.openVideo}
                  showVideoClicked={this.state.showVideoClicked}
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

export default withStyles(styles)(MovieDetailComponent);
