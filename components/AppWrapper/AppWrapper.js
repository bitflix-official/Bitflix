import PropTypes from 'prop-types';
import React from 'react';

const AppWrapper = ({ children }) => (
  <div className="flex flex-col px-16 md:px-24 2xl:px-32">
    {children}
  </div>
);

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppWrapper;
