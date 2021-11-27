import PropTypes from 'prop-types';
import React from 'react';

const Command = ({ children }) => (
  <div className="bg-gray-600 text-white px-2 text-sm rounded-sm shadow-sm">
    {children}
  </div>
);

Command.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Command;
