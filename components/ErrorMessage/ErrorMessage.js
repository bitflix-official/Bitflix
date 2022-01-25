import { InfoCircledIcon } from '@radix-ui/react-icons';
import PropTypes from 'prop-types';
import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="bg-red-200 px-4 py-1 flex items-center text-red-800 rounded-sm">
    <InfoCircledIcon className="mr-1" />
    <span className="ml-1">{message}</span>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
