import React from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import GridListTile from "@material-ui/core/GridListTile";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  cardInner: {
    padding: `0 ${theme.spacing.unit}px`,
    width: '50%',
    display: 'block',
    marginBottom: theme.spacing.unit,
    cursor: 'pointer',
  },
})

const GridItemHOC = props => {
  const {
    children,
    classes,
    inline
  } = props;

  if (!inline) {
    return (
      <Grid item xs={6} sm={4} md={3} className={classes.cardInner}>
        {children}
      </Grid>
    )
  }
  return (
    <GridListTile className={classes.cardInner}>
      {children}
    </GridListTile>
  );
};

GridItemHOC.propTypes = {
  inline: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default withStyles(styles)(GridItemHOC);
