import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';

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

const GenreList = ({ data, genres, classes }) => {
  return (
    <div>
      {data &&
        data.map(item => {
          return (
            <Link
              key={item.id}
              to={`/searchResults/searchByGenre/${item.id}/${genres[item.id]}`}
              className={classes.chipWrapper}
            >
              <Chip label={genres[item.id]} className={classes.chip} />
            </Link>
          );
        })}
    </div>
  );
};

export default withStyles(styles)(GenreList);
