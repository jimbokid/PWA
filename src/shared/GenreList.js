import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  chip: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    height: 26,
    cursor: 'pointer',
  },
  chipWrapper: {
    textDecoration: 'none',
  },
});

export const GenreList = ({ data, genres, classes, searchBy, title }) => {
  return (
    <div className={'genreList'}>
      <Typography variant="title" gutterBottom>
        {title}:
      </Typography>
      {data &&
        data.map(item => {
          return (
            <Link
              key={item.id}
              to={`/searchResults/${searchBy}/${item.id}/${
                genres ? genres[item.id] : item.name
              }`}
              className={classes.chipWrapper}
            >
              <Chip
                label={genres ? genres[item.id] : item.name}
                className={classes.chip}
              />
            </Link>
          );
        })}
    </div>
  );
};

export default withStyles(styles)(GenreList);
