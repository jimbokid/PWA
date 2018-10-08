import React from 'react';
import { shallow } from 'enzyme';
import { ProfileComponent } from './ProfileComponent';

let setup;

describe('<ProfileComponent/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...props };
      return shallow(<ProfileComponent {...props} />);
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    setup();
  });
});
