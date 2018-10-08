import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../assets/icon.png';
import { withStyles } from '@material-ui/core/styles/index';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

import Search from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = {
  logo: {
    maxHeight: 45,
    maxWidth: 40,
    display: 'inline-block',
    marginRight: 15,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
};

export const Header = ({ classes, toggleSearch }) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar className={classes.toolbar}>
        <Link to={`/`} aria-label="home">
          <img src={Logo} alt="" className={classes.logo} />
        </Link>

        <IconButton
          onClick={toggleSearch}
          color="primary"
          className="searchBtn"
        >
          <Search />
        </IconButton>

        <Link
          to={'/profile/'}
          aria-label="movie detail page"
          style={{ textDecoration: 'none' }}
        >
          <IconButton color="primary">
            <AccountCircle />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
