import PropTypes from 'prop-types';
import React from 'react';
import CarouselItem from './CarouselItem';

const TitlesCarousel = ({ title, subtitle, items }) => (
  <div className="flex flex-col my-12">
    <span className="text-white text-xl font-semibold">{title}</span>
    {subtitle && <span className="text-gray-300 text-md mt-1">{subtitle}</span>}
    <div className="flex items-center flex-nowrap overflow-x-scroll mt-5">
      {
        items.map((item, index) => (
          <CarouselItem item={item} index={index} key={`title-id-${item.id}`} />
        ))
      }
    </div>
  </div>
);

TitlesCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

TitlesCarousel.defaultProps = {
  subtitle: '',
};

export default TitlesCarousel;
