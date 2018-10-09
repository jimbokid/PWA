import React from 'react';
import firebase from 'firebase';
import { firebaseConfig } from '../constants/firebase';

firebase.initializeApp(firebaseConfig);

export const MyContext = React.createContext();

export class Auth extends React.PureComponent {
  state = {
    userUid: null,
    isSignedIn: null,
    favorites: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user,
        userUid: user ? user.uid : null,
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
                arr.push({ ...data[key], recordId: key });
              }
            }

            this.setState({
              favorites: arr,
            });
          });
      }
    });
  }

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default Auth;
