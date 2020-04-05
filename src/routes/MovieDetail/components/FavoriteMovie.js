import React from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from "../../../shared/Auth";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {addToFavorite, removeFromFavorite} from "../../../utils/componentHelpers";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

const FavoriteMovie = props => {
  const {
    classes,
    type,
    id,
    data
  } = props;

  const {
    isFirebaseConfigured,
    isSignedIn,
    favorites,
    userUid
  } = React.useContext(AuthContext);

  if (isFirebaseConfigured === false) {
    return null
  }

  if (isSignedIn === false) {
    return (
      <React.Fragment>
        <Typography gutterBottom>
          You need to be authorized
        </Typography>
        <Link
          to={`/profile/`}
          style={{textDecoration: 'none'}}
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
    isSignedIn === null ||
    favorites === null ||
    type !== 'movie'
  ) {
    return false;
  }

  let isFavorite = false;
  let recordId = null;

  favorites.forEach(item => {
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
            userUid,
            recordId,
            )
            : addToFavorite(userUid, data);
        }}
      >
        {isFavorite
          ? 'Remove from favorite'
          : 'Add to favorite'}
      </Button>
    </React.Fragment>
  );
};

FavoriteMovie.propTypes = {
  classes: PropTypes.object,
  type: PropTypes.string,
  id: PropTypes.string,
  data: PropTypes.object
};

export default withStyles(styles)(FavoriteMovie);
