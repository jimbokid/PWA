import React from 'react';
import { shallow } from 'enzyme';
import { MovieDetailComponent } from './MovieDetailComponent';

const defaultProps = {
  data: {
    id: 1,
    title: 'title',
    genres: [
      {
        id: 28,
        name: 'action',
      },
    ],
  },
  classes: {},
  similar: {},
  credits: {},
  match: {
    params: {
      id: 1,
      type: 'type',
    },
  },
  videos: {
    results: [],
  },
  genres: {},
  isLoading: false,
  error: null,
  fetchDetailMovie: jest.fn(),
  cleanDetailPage: jest.fn(),
  keywords: [],
};

let setup;

describe('<MovieDetailComponent/>', () => {
  beforeEach(() => {
    setup = props => {
      props = { ...defaultProps, ...props };
      return shallow(<MovieDetailComponent {...props} />);
    };
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing and call fetch', () => {
    setup();
    expect(defaultProps.fetchDetailMovie).toHaveBeenCalledTimes(1);
  });

  it('have to clear search after unmount', () => {
    const wrapper = setup();
    wrapper.unmount();
    expect(defaultProps.cleanDetailPage).toHaveBeenCalledTimes(1);
  });

  it('have reFetch detail info on page', () => {
    const wrapper = setup();
    wrapper.instance().componentWillReceiveProps({
      match: {
        params: {
          id: 2,
          type: 'type',
        },
      },
    });
    expect(defaultProps.fetchDetailMovie).toHaveBeenCalledTimes(2);
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
