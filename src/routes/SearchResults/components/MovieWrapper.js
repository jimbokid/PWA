import React from 'react';
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import CameraAlt from "@material-ui/icons/CameraAlt";
import deepOrange from "@material-ui/core/colors/deepOrange";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
  item: {
    textDecoration: 'none',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: `0 1px ${theme.spacing.unit}px`,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
  },
  content: {
    flex: '1 0 auto',
  },
  chip: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    height: 26,
    cursor: 'pointer',
  },
  avatar: {
    color: '#fff',
    backgroundColor: deepOrange[500],
    fontSize: 14,
  },
  cover: {
    width: '40%',
    backgroundColor: grey[200],
    paddingTop: '61%',
    height: '0',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
})

const MovieWrapper = ({movie, classes, genres}) => {
  return (
    <React.Fragment>
      <Typography variant="title" gutterBottom>
        Movies
      </Typography>
      {movie &&
      movie.results.map((item, key) => {
        const date = moment(item.release_date).format('MMM Do YYYY');

        return (
          <Link
            to={`/moviedetail/movie/${item.id}`}
            className={classes.item}
            aria-label="movie detail page"
            key={key}
          >
            <Card className={classes.card}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography variant="title" gutterBottom>
                    {item.original_title}
                  </Typography>

                  <Typography variant="subheading" color="textSecondary">
                    {date}
                  </Typography>
                  {item.genre_ids.map((inner, key) => {
                    return (
                      <Chip
                        label={genres[inner]}
                        className={classes.chip}
                        key={key}
                      />
                    );
                  })}

                  <Avatar className={classes.avatar}>
                    {item.vote_average}
                  </Avatar>
                </CardContent>
              </div>

              <div className={classes.cover}>
                {item.poster_path ? (
                  <CardMedia
                    className={classes.image}
                    image={`https://image.tmdb.org/t/p/w300/${
                      item.poster_path
                    }`}
                  />
                ) : (
                  <CameraAlt/>
                )}
              </div>
            </Card>
          </Link>
        );
      })}
    </React.Fragment>
  );
};

MovieWrapper.propTypes = {
  data: PropTypes.object,
  classes: PropTypes.object,
  match: PropTypes.object,
  fetchByGenre: PropTypes.func,
  fetchByKeyword: PropTypes.func,
  movie: PropTypes.object,
  genres: PropTypes.object,
  isLoading: PropTypes.bool
};

export default withStyles(styles)(MovieWrapper);
