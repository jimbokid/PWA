import firebase from "firebase";

export const addUserInformation = (userUid, data) => {
  firebase
    .database()
    .ref(`Users/${userUid}/userInfo/`)
    .on('value', snapshot => {
      const response = snapshot.val();

      if (response === null) {
        firebase
          .database()
          .ref(`Users/${userUid}/userInfo/`)
          .push(data)
          .then(data => {
            console.log('data ', data);
          })
          .catch(error => {
            console.log('error ', error);
          });
      } else {
        const key = Object.keys(response)[0];

        firebase
          .database()
          .ref(`Users/${userUid}/userInfo/${key}`)
          .update(data)
          .then(data => {
            console.log('data ', data);
          })
          .catch(error => {
            console.log('error ', error);
          });
      }
    });
};
