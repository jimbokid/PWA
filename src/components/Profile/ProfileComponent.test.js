import React from 'react';
import { shallow } from 'enzyme';
import { ProfileComponent } from './ProfileComponent';

let setup;

const context = {
  favorites: [
    {
      poster_path: 'poster_path',
    },
  ],
};

describe('<ProfileComponent/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...props };
      return shallow(<ProfileComponent {...props} />, { context });
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    setup();
  });
});
