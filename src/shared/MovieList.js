import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import CardMedia from '@material-ui/core/CardMedia';
import CameraAlt from '@material-ui/icons/CameraAlt';
import grey from '@material-ui/core/colors/grey';
import LazyLoad from 'react-lazyload';

const styles = theme => ({
  cardInner: {
    padding: `0 ${theme.spacing.unit}px`,
    width: '50%',
    display: 'block',
    marginBottom: theme.spacing.unit,
    cursor: 'pointer',
  },
  media: {
    height: 0,
    paddingTop: '150%',
    background: '#949494',
  },
  cardLayout: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: 'auto',
  },
  gridList: {
    width: '100%',
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  vote: {
    position: 'absolute',
    top: theme.spacing.unit,
    right: theme.spacing.unit,
    fontSize: 13,
    backgroundColor: deepOrange[800],
  },
  cover: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: grey[200],
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: 'auto',
  },
});

export class MovieList extends React.Component {
  componentWillReceiveProps() {
    ReactDOM.findDOMNode(this).scrollLeft = 0;
  }

  render() {
    const { data, classes, inline, type, cast, cols } = this.props;

    return (
      <GridList
        className={inline ? classes.gridList : classes.cardLayout}
        cols={cols}
        cellHeight={'auto'}
        ref="GridList"
        style={{
          margin: 0,
        }}
      >
        {data.map((item, key) => {
          const listItem = {
            title: cast ? item.name : item.title || item.original_name,
            image: cast
              ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${
                  item.profile_path
                }`
              : `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${
                  item.poster_path
                }`,
            subtitle: cast ? item.character : null,
            link: cast
              ? `/persondetail/${item.id}`
              : `/moviedetail/${type}/${item.id}`,
          };

          return (
            <GridListTile key={key} className={classes.cardInner}>
              <LazyLoad height={400} offset={100}>
                <Link to={listItem.link} aria-label="movie detail page">
                  <div className={classes.media}>
                    {item.profile_path !== null ? (
                      <CardMedia
                        className={classes.image}
                        image={listItem.image}
                        title={item.title}
                      />
                    ) : (
                      <CameraAlt className={classes.icon} />
                    )}

                    {item.vote_average && (
                      <Avatar className={classes.vote}>
                        {item.vote_average}
                      </Avatar>
                    )}

                    <GridListTileBar
                      title={listItem.title}
                      subtitle={listItem.subtitle}
                    />
                  </div>
                </Link>
              </LazyLoad>
            </GridListTile>
          );
        })}
      </GridList>
    );
  }
}

export default withStyles(styles)(MovieList);
