import React from 'react';
import { shallow } from 'enzyme';
import { DashboardComponent } from './DashboardComponent';

const defaultProps = {
  classes: {},
  popular: {
    results: [],
  },
  fetchSearch: jest.fn(),
  fetchPopularMovies: jest.fn(),
  search: {},
  clearSearch: jest.fn(),
  total_results: 0,
  error: null,
};

let setup;

describe('<DashboardComponent/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return shallow(<DashboardComponent {...props} />);
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    setup();
  });

  it('have to do fetch after mount', () => {
    setup();
    expect(defaultProps.fetchPopularMovies).toHaveBeenCalledTimes(1);
  });

  it('have to clear search after umount', () => {
    const wrapper = setup();
    wrapper.unmount();
    expect(defaultProps.clearSearch).toHaveBeenCalledTimes(1);
  });

  it('have show error message and no render main layout', () => {
    const wrapper = setup({
      error: {
        message: '',
        response: {
          data: {
            status_message: '',
          },
        },
      },
    });

    expect(wrapper.find('#errorWrapper').length).toBe(1);
  });
});
