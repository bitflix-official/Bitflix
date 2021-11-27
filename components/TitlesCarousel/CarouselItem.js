import PropTypes from 'prop-types';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Tooltip from '@radix-ui/react-tooltip';
import { TITLE_ROUTE } from '../../routes';

const CarouselItem = ({ item, index }) => (
  <Link href={`${TITLE_ROUTE}/${item.id}`} key={`title-id-${item.id}`}>
    <div
      className={`flex flex-col text-white cursor-pointer ${index === 0 ? 'mr-4' : 'mx-4'}`}
    >
      <div className="w-32 h-48 relative">
        <Image src={item.large_cover_image} className="rounded-md" layout="fill" quality={100} />
      </div>
      <div className="flex flex-col items-start pt-2 pb-4">
        <Tooltip.Root>
          <Tooltip.Trigger className="overflow-x-hidden whitespace-nowrap overflow-ellipsis w-28 text-left"><span className="font-semibold text-sm">{item.title}</span></Tooltip.Trigger>
          <Tooltip.Content side="bottom">
            <div className="text-white bg-gray-800 shadow-md py-2 px-4 rounded-md text-xs">{item.title}</div>
          </Tooltip.Content>
        </Tooltip.Root>
        <span className="text-xs text-gray-300">{item.year}</span>
      </div>
    </div>
  </Link>
);

CarouselItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    large_cover_image: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CarouselItem;
