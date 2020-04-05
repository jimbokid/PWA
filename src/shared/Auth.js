import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import {firebaseConfig} from '../constants/firebase';

if (firebaseConfig.apiKey) {
  firebase.initializeApp(firebaseConfig);
}

export const AuthContext = React.createContext();

export class Auth extends React.PureComponent {
  state = {
    userUid: null,
    isSignedIn: null,
    favorites: null,
    isFirebaseConfigured: false
  };

  componentDidMount() {
    if (firebaseConfig.apiKey) {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({
          isSignedIn: !!user,
          userUid: user ? user.uid : null,
          isFirebaseConfigured: true
        });

        if (user) {
          firebase
            .database()
            .ref(`Users/${user.uid}/favorites/`)
            .on('value', snapshot => {
              const data = snapshot.val();
              let arr = [];
              for (let key in data) {
                if (data.hasOwnProperty(key)) {
                  arr.push({...data[key], recordId: key});
                }
              }

              this.setState({
                favorites: arr,
              });
            });
        }
      });
    }
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

Auth.propTypes = {
  children: PropTypes.object
};

export default Auth;
