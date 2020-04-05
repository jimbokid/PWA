import React from 'react';
import Layout from '../../shared/Layout';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {AuthContext} from '../../shared/Auth';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from 'react-router-dom';
import {
  generateListItem,
  removeFromFavorite,
} from '../../utils/componentHelpers';

import WithLoader from '../../shared/WithLoader';
import Button from '@material-ui/core/Button';
import {addUserInformation} from "../../utils/userInformationHelper";
import {APP_VERSION} from "../../constants/appConstants";


const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: authResult => {
      addUserInformation(authResult.user.uid, authResult.additionalUserInfo);
    },
  },
};


export const Profile = () => {
  return (
    <Layout>
      <AuthContext.Consumer>
        {context => (
          <React.Fragment>
            {context.isSignedIn === null && <WithLoader isLoading={true}/>}

            {!context.isSignedIn ? (
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            ) : (
              <div>
                <Typography gutterBottom noWrap>
                  Welcome {firebase.auth().currentUser.displayName}! You are now
                  signed-in!
                </Typography>

                {context.favorites && (
                  <List dense={false}>
                    {context.favorites.map((item, key) => {
                      const listItem = generateListItem(false, item, 'movie');

                      return (
                        <Link
                          to={listItem.link}
                          aria-label="movie detail page"
                          key={key}
                          style={{textDecoration: 'none'}}
                          className="favoriteListItem"
                        >
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar
                                alt="Remy Sharp"
                                src={`https://image.tmdb.org/t/p/w150_and_h150_bestv2${
                                  item.poster_path
                                }`}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={item.title}
                              secondary={item.tagline}
                            />
                            <ListItemSecondaryAction>
                              <IconButton
                                aria-label="Delete"
                                onClick={e => {
                                  e.preventDefault();
                                  removeFromFavorite(
                                    context.userUid,
                                    item.recordId,
                                  );
                                }}
                              >
                                <DeleteIcon/>
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <Divider/>
                        </Link>
                      );
                    })}
                  </List>
                )}

                <Button
                  variant="contained"
                  onClick={() => firebase.auth().signOut()}
                >
                  Sign-out
                </Button>
              </div>
            )}


            <div className={"applicationVersion"}>
              <Typography variant="caption" display="block" gutterBottom>
                {APP_VERSION}
              </Typography>
            </div>
          </React.Fragment>
        )}
      </AuthContext.Consumer>
    </Layout>
  );
}

export default Profile;
