import PropTypes from 'prop-types';
import React from 'react';

const AppWrapper = ({ children }) => (
  <div className="flex flex-col px-12 2xl:px-16">
    {children}
  </div>
);

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppWrapper;
