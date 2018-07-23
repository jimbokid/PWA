import React from 'react';
import Header from './Header';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const styles = theme => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    margin: -theme.spacing.unit,
    '& *': {
      boxSizing: 'border-box',
    },
  },
  content: {
    flex: '1 0 auto',
  },
  contentInner: {
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
    position: 'relative',
  },
});

export class Layout extends React.Component {
  componentWillUnmount() {
    ReactDOM.findDOMNode(this).scrollTop = 0;
    window.scrollTo(0, 0);
  }
  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.container}>
        <Header />
        <div className={classes.content}>
          <div className={classes.contentInner}>{children}</div>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default withStyles(styles, { name: 'Layout' })(Layout);
