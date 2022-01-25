import { primaryColor } from 'constants';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './spinner.module.css';

const Spinner = ({ size, color, border }) => {
  if (primaryColor) {
    return (
      <div
        style={{
          width: size, height: size, borderLeftColor: color || primaryColor,
        }}
        className={`${styles.spinner} border-4 border-solid ${border || 'border-gray-800'}`}
      />
    );
  }
  return null;
};

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.string,
};

Spinner.defaultProps = {
  size: '2.25rem',
  color: '',
  border: '',
};

export default Spinner;
