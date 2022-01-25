/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React from 'react';
import { SkeletonItem, Item } from 'components';

const SimilarTitles = ({ items }) => (
  <ul className="flex items-center flex-nowrap overflow-x-auto">
    {
      items ? items.map((item, index) => (
        <Item item={item} index={index} key={`title-id-${item.id}`} />
      )) : (
        Array.from(Array(9)).map((el, index) => (
          <SkeletonItem index={index} key={`skeleton-item-${index}`} />
        ))
      )
    }
  </ul>
);

SimilarTitles.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
};

SimilarTitles.defaultProps = {
  items: null,
};

export default SimilarTitles;
