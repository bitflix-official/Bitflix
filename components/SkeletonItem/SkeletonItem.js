import PropTypes from 'prop-types';
import React from 'react';

const SkeletonItem = ({ index }) => (
  <div className={`flex flex-col relative animate-pulse ${index === 0 ? 'mr-4' : 'mx-4'} mb-4`} key={`skeleton-item-${index}`}>
    <div className="w-36 h-52 bg-gray-600 rounded-md" />
  </div>
);

SkeletonItem.propTypes = {
  index: PropTypes.number,
};

SkeletonItem.defaultProps = {
  index: 0,
};

export default SkeletonItem;
