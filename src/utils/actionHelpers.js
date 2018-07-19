export const genreGroup = genres => {
  let genreList = {};
  genres.forEach(item => {
    genreList[item.id] = item.name;
  });
  return genreList;
};
