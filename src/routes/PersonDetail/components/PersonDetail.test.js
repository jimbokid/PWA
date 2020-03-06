import React from 'react';
import { shallow } from 'enzyme';
import { PersonDetail } from './PersonDetail';

const defaultProps = {
  classes: {},
  data: {
    name: 'name',
    birthday: '',
    place_of_birth: 'place_of_birth',
    biography: 'biography',
  },
  movies: [],
  match: {
    params: {
      id: 1,
    },
  },
  fetchDetailPerson: jest.fn(),
  cleanPersonPage: jest.fn(),
  isLoading: false,
};

let setup;

describe('<PersonDetail/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return shallow(<PersonDetail {...props} />);
    };
  });

  it('renders without crashing and call fetch', () => {
    setup();
    expect(defaultProps.fetchDetailPerson).toHaveBeenCalledTimes(1);
  });

  it('renders without crashing and call fetch', () => {
    const wrapper = setup();
    wrapper.unmount();
    expect(defaultProps.cleanPersonPage).toHaveBeenCalledTimes(1);
  });
});
