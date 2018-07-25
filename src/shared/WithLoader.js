import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    position: 'relative',
    height: '100vh',
    width: '100%',
  },
  loaderContainer: {
    position: 'absolute',
    left: -theme.spacing.unit,
    top: -theme.spacing.unit * 2,
    right: -theme.spacing.unit,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,.5)',
    zIndex: 2,
  },
  loader: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});

export const WithLoader = ({ classes, children, isLoading }) => {
  return (
    <div className={classes.root}>
      {isLoading && (
        <div className={`${classes.loaderContainer} loaderContainer`}>
          <CircularProgress className={classes.loader} />
        </div>
      )}
      <div className={classes.content}>{children}</div>
    </div>
  );
};

WithLoader.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default withStyles(styles)(WithLoader);
