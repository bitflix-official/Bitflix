import PropTypes from 'prop-types';
import React from 'react';

const AppWrapper = ({ children }) => (
  <div className="flex flex-col px-4 lg:px-8 xl:px-16 2xl:px-24 max-w-screen-2xl mx-auto">
    {children}
  </div>
);

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppWrapper;
