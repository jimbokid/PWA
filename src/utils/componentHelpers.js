/* eslint-disable no-console */
import firebase from 'firebase';

export const generateListItem = (cast, item, type) => ({
  title: cast ? item.name : item.title || item.original_name,
  image: cast
    ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.profile_path}`
    : `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`,
  subtitle: cast ? item.character : null,
  link: cast ? `/persondetail/${item.id}` : `/moviedetail/${type}/${item.id}`,
});

export const addToFavorite = (userUid, data) => {
  firebase
    .database()
    .ref(`Users/${userUid}/favorites`)
    .push(data)
    .then(data => {
      console.log('data ', data);
    })
    .catch(error => {
      console.log('error ', error);
    });
};



export const removeFromFavorite = (userUid, id) => {
  firebase
    .database()
    .ref(`Users/${userUid}/favorites/`)
    .child(id)
    .remove();
};
