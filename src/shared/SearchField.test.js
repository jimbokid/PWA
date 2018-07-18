import React from 'react';
import { shallow,render } from 'enzyme';
import { SearchField } from './SearchField';

const defaultProps = {
  classes: {},
  data: [
    {
      media_type: 'media_type',
      id: 1,
      name: 'name',
      release_date: '0001-01-01T00:00:00+02:00',
    },
  ],
  fetchSearch: jest.fn(),
  clearSearch: jest.fn(),
};

let setup;

describe('<SearchField/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return shallow(<SearchField {...props} />);
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing and call fetch', () => {
    setup();
  });

  it('should call fetchSearch fn after input changes', () => {
    const wrapper = setup();
    wrapper.find('#name').simulate('change', { target: { value: '7' } });
    expect(defaultProps.fetchSearch).toHaveBeenCalledTimes(1);
  });
});
