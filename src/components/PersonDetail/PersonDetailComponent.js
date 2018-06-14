import React from 'react';
import Layout from '../../shared/Layout';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import WithLoader from '../../shared/WithLoader';
import Avatar from '@material-ui/core/Avatar';
import MovieList from '../../shared/MovieList';
import TitleTextComponent from '../../shared/TitleTextComponent';
import ReactDOM from 'react-dom';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  bigAvatar: {
    width: 200,
    height: 200,
    margin: 'auto',
    background: '#cacaca',
  },
};

export class PersonDetailComponent extends React.Component {
  componentWillMount() {
    const { match, fetchDetailPerson } = this.props;
    const { id } = match.params;
    fetchDetailPerson(id);
  }
  componentWillUnmount() {
    ReactDOM.findDOMNode(this).scrollTop = 0;
    const { cleanPersonPage } = this.props;

    cleanPersonPage();
    window.scrollTo(0, 0);
  }
  render() {
    const { data, classes, isLoading, movies } = this.props;

    return (
      <Layout>
        <WithLoader isLoading={isLoading}>
          <Avatar
            alt={data.name}
            className={classes.bigAvatar}
            src={`https://image.tmdb.org/t/p/w400${data.profile_path}`}
          />
          <Typography variant="headline" gutterBottom align={'center'}>
            {data.name}
          </Typography>

          <TitleTextComponent
            title={'Birthday:'}
            text={data && moment(data.birthday).format('MMM DD YYYY')}
          />

          <TitleTextComponent
            title={'Place of birth:'}
            text={data.place_of_birth}
          />

          <TitleTextComponent title={'Biography:'} text={data.biography} />

          <Typography variant="title" gutterBottom>
            Filmography:
          </Typography>

          {movies && (
            <MovieList data={movies} inline={true} type={'movie'} cols={2.2} />
          )}
        </WithLoader>
      </Layout>
    );
  }
}

export default withStyles(styles)(PersonDetailComponent);