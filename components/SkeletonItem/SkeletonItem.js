import PropTypes from 'prop-types';
import React from 'react';

const SkeletonItem = ({ index }) => <div className={`flex flex-col text-white relative w-32 h-48 ${index === 0 ? 'mr-4' : 'mx-4'} bg-gray-600 rounded-md mb-4 animate-pulse`} key={`skeleton-item-${index}`} />;

SkeletonItem.propTypes = {
  index: PropTypes.number,
};

SkeletonItem.defaultProps = {
  index: 0,
};

export default SkeletonItem;
