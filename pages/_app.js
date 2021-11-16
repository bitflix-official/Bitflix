import PropTypes from 'prop-types';
import React from 'react';

const App = ({ Component, pageProps }) => (
  <Component pageProps={pageProps} />
);

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default App;
