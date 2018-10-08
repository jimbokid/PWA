import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../assets/icon.png';
import { withStyles } from '@material-ui/core/styles/index';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

import Search from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

export class Header extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { classes, toggleSearch } = this.props;
    const { anchorEl } = this.state;
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

          <IconButton color="primary" onClick={this.handleClick}>
            <AccountCircle />
          </IconButton>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem>
              <Link
                to={'/profile/'}
                aria-label="movie detail page"
                style={{ textDecoration: 'none' }}
              >
                Profile
              </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
