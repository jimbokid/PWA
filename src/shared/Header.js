import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../assets/icon.png';
import {withStyles} from '@material-ui/core/styles/index';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

import Search from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = (theme) => ({
  logo: {
    maxHeight: 45,
    maxWidth: 40,
    display: 'inline-block',
    marginRight: 15,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  content: {
    flex: '1 0 auto',
  },
  contentInner: {
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    position: 'relative',
  },
})

export const Header = ({classes, toggleSearch}) => {
  return (
    <AppBar position="static" color="default">
      <div className={classes.content}>
        <div className={classes.contentInner}>
          <Toolbar className={classes.toolbar}>
            <Link to={`/`} aria-label="home">
              <img src={Logo} alt="" className={classes.logo}/>
            </Link>

            <IconButton
              onClick={toggleSearch}
              color="primary"
              className="searchBtn"
            >
              <Search/>
            </IconButton>

            <Link
              to={'/profile/'}
              aria-label="movie detail page"
              style={{textDecoration: 'none'}}
            >
              <IconButton color="primary">
                <AccountCircle/>
              </IconButton>
            </Link>
          </Toolbar>
        </div>
      </div>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object,
  toggleSearch: PropTypes.func
};

export default withStyles(styles)(Header);
