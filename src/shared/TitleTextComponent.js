import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  emptyWrapper: {
    minHeight: theme.typography.body1.lineHeight,
    background: grey[200],
  },
});

const TitleTextComponent = ({ title, text, classes }) => {
  return (
    <React.Fragment>
      <Typography variant="title" gutterBottom>
        {title}
      </Typography>
      {text ? (
        <Typography gutterBottom>{text}</Typography>
      ) : (
        <div className={`${classes.emptyWrapper} emptyWrapper`}/>
      )}
    </React.Fragment>
  );
};

TitleTextComponent.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  classes: PropTypes.object
};

export default withStyles(styles)(TitleTextComponent);
