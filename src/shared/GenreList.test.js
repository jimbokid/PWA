import React from 'react';
import { shallow } from 'enzyme';
import { GenreList } from './GenreList';

const defaultProps = {
  data: [
    {
      name: 'test',
      id: 1,
    },
  ],
  genres: null,
  classes: {},
  searchBy: 'string',
  title: 'string',
};

let setup;

describe('<GenreList/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return shallow(<GenreList {...props} />);
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.find('Link').length).toBe(1);
  });

  it('check correct render of genres ', () => {
    setup({
      genres: {
        1: 'test',
      },
    });
  });
});
