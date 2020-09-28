import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Layout from '../../../shared/Layout';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import MovieList from '../../../shared/MovieList';
import moment from 'moment';
import WithLoader from '../../../shared/WithLoader';
import ErrorMessage from '../../../shared/ErrorMessage';
import TitleTextComponent from '../../../shared/TitleTextComponent';
import GenreList from '../../../shared/GenreList';
import PropTypes from 'prop-types';
import FavoriteMovie from './FavoriteMovie';
import VideoWrapper from './VideoWrapper';
import ShareBtns from "../../../shared/ShareBtns";

const styles = (theme) => ({
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
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  header: {
    paddingTop: '20%',
    [theme.breakpoints.down('md')]: {
      paddingTop: '30%',
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: '40%',
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: '56.25%',
    },
  }
});

export const StyledHeader = styled.div`
  background: #949494 URL(https://image.tmdb.org/t/p/w1400_and_h450_face${(
  props,
) => props.backdrop_path});
  background-size: cover;
  background-position: center center;
  margin: -32px -16px 0;
  
  position: relative;
`;

const MovieDetail = (props) => {
  const [openVideo, setOpenVideo] = React.useState(false);
  const [showVideoClicked, setShowVideoClicked] = React.useState(false);

  React.useEffect(() => {
    return () => {
      const {cleanDetailPage} = props;
      cleanDetailPage();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const {fetchDetailMovie} = props;
    const {id, type} = props.match.params;
    fetchDetailMovie(id, type);
    window.scrollTo(0, 0);

    setOpenVideo(false);
    setShowVideoClicked(false);
  },[props.match.params.id])

  function handleVideo() {
    setOpenVideo(!openVideo);
    setShowVideoClicked(true);
  }

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
  } = props;

  const {type} = match.params;

  if (error) {
    return <ErrorMessage error={error} id={'errorWrapper'}/>;
  }

  return (
    <Layout>
      <WithLoader isLoading={isLoading}>
        <React.Fragment>
          <div className={classes.movieInfo}>
            <StyledHeader {...data} className={classes.header}>
              <Typography variant="display1" className={classes.movieTitle}>
                {data.title || data.original_name}
              </Typography>
            </StyledHeader>

            <div className={classes.infoWrapper}>
              <ShareBtns title={data.title || data.original_name}/>

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

              <FavoriteMovie type={type} id={match.params.id} data={data}/>


              {!!(data.vote_average) && (
                <TitleTextComponent
                  title={'Vote average:'}
                  text={data.vote_average}
                />
              )}
              <TitleTextComponent
                title={'Release Date:'}
                text={
                  (data.release_date &&
                    moment(data.release_date).format('MMM DD YYYY')) ||
                  (data.first_air_date &&
                    moment(data.first_air_date).format('MMM DD YYYY'))
                }
              />
              <TitleTextComponent title={'Overview:'} text={data.overview}/>
              <VideoWrapper
                data={videos.results}
                handleVideo={handleVideo}
                openVideo={openVideo}
                showVideoClicked={showVideoClicked}
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
                  // cols={{
                  //   xs:2
                  // }}
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
                  // cols={1.5}
                />
              )}


            </div>
          </div>
        </React.Fragment>
      </WithLoader>
    </Layout>
  );
};

MovieDetail.propTypes = {
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
  cleanDetailPage: PropTypes.func,
  fetchDetailMovie: PropTypes.func,
};

export default withStyles(styles)(MovieDetail);
