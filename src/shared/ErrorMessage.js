import * as React from 'react';
import Layout from './Layout';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

export const ErrorMessage = ({ error }) => {
  return (
    <Layout id={'errorWrapper'}>
      <Typography variant="title" gutterBottom>
        Something goes wrong:
      </Typography>
      <Typography gutterBottom>{error.message}</Typography>
      <Typography gutterBottom>{error.response.data.status_message}</Typography>
    </Layout>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired,
};

export default ErrorMessage;
