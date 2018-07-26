import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../assets/icon.png';
import { withStyles } from '@material-ui/core/styles/index';
import { Link } from 'react-router-dom';

const styles = {
  logo: {
    maxHeight: 45,
    maxWidth: 40,
    display: 'inline-block',
    marginRight: 15,
  },
};

export const Header = ({ classes }) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Link to={`/`} aria-label="home">
          <img src={Logo} alt="" className={classes.logo} />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
