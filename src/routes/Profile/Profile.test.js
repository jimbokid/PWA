import React from 'react';
import { shallow } from 'enzyme';
import { Profile } from './Profile';

let setup;

const context = {
  favorites: [
    {
      poster_path: 'poster_path',
    },
  ],
};

describe('<Profile/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...props };
      return shallow(<Profile {...props} />, { context });
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    setup();
  });
});
