import * as React from 'react';
import { mount } from 'enzyme';
import GenreList from './GenreList';

const defaultProps = {
  data: [],
  genres: {},
  classes: {},
  searchBy: 'string',
  title: 'string',
};

let setup;

describe('<GenreList/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return mount(<GenreList {...props} />);
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    setup();
  });
});
