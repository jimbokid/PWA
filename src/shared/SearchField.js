import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import moment from 'moment/moment';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  textField: {
    width: '100%',
    marginTop: 0,
  },
  dropdownWrapper: {
    position: 'relative',
    zIndex: 1,
  },
  dropdownInner: {
    width: '100%',
    position: 'absolute',
    background: '#fff',
  },
  avatar: {
    fontSize: 12,
    marginRight: theme.spacing.unit,
  },
  item: {
    textDecoration: 'none',
  },
});

class SearchField extends React.Component {
  state = {
    movieName: '',
  };

  handleChange = () => event => {
    const { fetchSearch } = this.props;
    this.setState({
      movieName: event.target.value,
    });

    fetchSearch(event.target.value);
  };

  clearSearch = () => {
    const { clearSearch } = this.props;
    this.setState({
      movieName: '',
    });
    clearSearch();
  };
  render() {
    const { classes, data } = this.props;
    return (
      <React.Fragment>
        <div>
          <TextField
            id="name"
            label="Search for a movie, tv show, person..."
            className={classes.textField}
            value={this.state.movieName}
            onChange={this.handleChange()}
            margin="normal"
            autoComplete="section-blue"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {this.state.movieName.length > 0 && (
                    <IconButton onClick={this.clearSearch}>
                      <Clear />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.dropdownWrapper}>
          <div className={classes.dropdownInner}>
            {this.state.movieName.length > 0 && (
              <Link
                to={`/searchResults/searchByName/${this.state.movieName}/null`}
                className={classes.item}
              >
                <MenuItem>Detail search for "{this.state.movieName}"</MenuItem>
              </Link>
            )}

            {data.map((item, key) => {
              return (
                <Link
                  to={
                    item.media_type === 'person'
                      ? `/persondetail/${item.id}`
                      : `/moviedetail/${item.media_type}/${item.id}`
                  }
                  key={key}
                  className={classes.item}
                >
                  <MenuItem>
                    <Avatar className={classes.avatar}>
                      {item.media_type}
                    </Avatar>
                    {item.name ? item.name : item.original_title}
                    <span>
                      ({moment(item.release_date || item.first_air_date).format(
                        'MMM Do YYYY',
                      )})
                    </span>
                  </MenuItem>
                </Link>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SearchField);
