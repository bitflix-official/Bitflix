/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React from 'react';
import { SkeletonItem, Item } from 'components';

const TitlesCarousel = ({ title, subtitle, items }) => (
  <div className="flex flex-col my-12">
    {title && <span className="text-white text-xl font-semibold">{title}</span>}
    {subtitle && <span className="text-gray-300 text-md mt-1">{subtitle}</span>}
    <ul className={`flex items-center flex-nowrap mt-5 ${items ? 'overflow-x-auto' : 'overflow-x-hidden'}`}>
      {
        items ? items.map((item, index) => (
          <Item item={item} index={index} key={`title-id-${item.id}`} />
        )) : (
          Array.from(Array(50)).map((el, index) => (
            <SkeletonItem index={index} key={`skeleton-item-${index}`} />
          ))
        )
      }
    </ul>
  </div>
);

TitlesCarousel.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
};

TitlesCarousel.defaultProps = {
  title: '',
  subtitle: '',
  items: null,
};

export default TitlesCarousel;
