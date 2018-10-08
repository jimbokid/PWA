import { generateListItem } from './componentHelpers';

describe('test components helpers fn', () => {
  it('should create correct listItem object', () => {
    const item = {
      title: 'title',
      poster_path: 'poster_path',
      id: 1,
      cast: true,
      profile_path: 'profile_path',
      character: {},
      name: 'name',
    };

    expect(generateListItem(true, item, 'type')).toEqual({
      image: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/profile_path',
      link: '/persondetail/1',
      subtitle: {},
      title: 'name',
    });
  });

  it('should create correct listItem object with other arguments', () => {
    const item = {
      poster_path: 'poster_path',
      id: 1,
      cast: false,
      profile_path: 'profile_path',
      character: {},
      original_name: 'original_name',
    };

    expect(generateListItem(false, item, 'type')).toEqual({
      image: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/poster_path',
      link: '/moviedetail/type/1',
      subtitle: null,
      title: 'original_name',
    });
  });
});
