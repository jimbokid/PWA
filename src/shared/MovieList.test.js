import React from 'react';
import { shallow } from 'enzyme';
import { MovieList } from './MovieList';

const defaultProps = {
  data: [
    {
      title: 'title',
      poster_path: 'poster_path',
      id: 1,
    },
  ],
  classes: {},
  inline: false,
  type: 'movie',
  cast: null,
  cols: null,
};

let setup;

describe('<MovieList/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return shallow(<MovieList {...props} />);
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing and call fetch', () => {
    setup();
  });
});
