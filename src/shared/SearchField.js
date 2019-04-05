import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import moment from 'moment/moment';
import Avatar from '@material-ui/core/Avatar';
import {clearSearch, fetchSearch} from '../actions/Search';
import {connect} from 'react-redux';

const styles = theme => ({
  textField: {
    width: '100%',
    marginTop: 0,
  },
  clearBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  dropdownWrapper: {
    position: 'relative',
    zIndex: 1,
  },
  dropdownInner: {
    width: '100%',
    background: '#fff',
    maxHeight: 'calc(100vh - 56px)',
    overflowY: 'scroll',
  },
  avatar: {
    fontSize: 12,
    marginRight: theme.spacing.unit,
  },
  item: {
    textDecoration: 'none',
  },
  menuItem: {
    height: 'auto',
    paddingLeft: 2,
    paddingRight: 2,
  },
});

export class SearchField extends React.PureComponent {
  state = {
    movieName: '',
  };

  handleChange = () => event => {
    const {fetchSearch} = this.props;
    this.setState({
      movieName: event.target.value,
    });

    fetchSearch(event.target.value);
  };

  closeSearchBar = () => {
    const {toggleSearch} = this.props;
    this.clearSearch();
    toggleSearch();
  };

  clearSearch = () => {
    const {clearSearch} = this.props;
    this.setState({
      movieName: '',
    });
    clearSearch();
  };

  render() {
    const {classes, search} = this.props;

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
          />

          {this.state.movieName.length > 0 && (
            <IconButton
              onClick={this.clearSearch}
              id="clearBtn"
              className={classes.clearBtn}
            >
              <Clear/>
            </IconButton>
          )}
        </div>
        <div className={classes.dropdownWrapper}>
          <div className={classes.dropdownInner}>
            {this.state.movieName.length > 0 && (
              <Link
                to={`/searchResults/searchByName/${this.state.movieName}/null`}
                className={classes.item}
                onClick={this.closeSearchBar}
              >
                <MenuItem>
                  Detail search for &quot;{this.state.movieName}&quot;
                </MenuItem>
              </Link>
            )}

            {search.map((item, key) => {
              return (
                <Link
                  to={
                    item.media_type === 'person'
                      ? `/persondetail/${item.id}`
                      : `/moviedetail/${item.media_type}/${item.id}`
                  }
                  key={key}
                  className={classes.item}
                  onClick={this.closeSearchBar}
                >
                  <MenuItem className={classes.menuItem}>
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

const mapStateToProps = ({search}) => ({
  search: search.data.results,
});

const mapDispatchToProps = dispatch => ({
  fetchSearch(name) {
    dispatch(fetchSearch(name));
  },
  clearSearch() {
    dispatch(clearSearch());
  },
});

SearchField.propTypes = {
  classes: PropTypes.object,
  search: PropTypes.any,
  clearSearch: PropTypes.func,
  toggleSearch: PropTypes.func,
  fetchSearch: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SearchField));
