import React from 'react';
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
        <div className={classes.emptyWrapper} />
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(TitleTextComponent);
