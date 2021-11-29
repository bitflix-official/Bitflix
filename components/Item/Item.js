/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useNotification } from 'hooks';
import AppContext from 'context/AppContext';
import * as ContextMenu from '@radix-ui/react-context-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  TriangleRightIcon, PlusIcon, Cross2Icon, StarIcon, CheckIcon,
} from '@radix-ui/react-icons';
import { summaryUnavailablePlaceholder } from 'constants';
import { Spinner } from 'components';
import { STREAM_ROUTE, TITLE_ROUTE } from '../../routes';
import styles from './item.module.css';

const Item = ({ item, index }) => {
  const {
    data: { userData: { list } },
    actions: { addItemToMyList, removeItemFromMyList },
  } = useContext(AppContext);
  const isItemOnList = list ? JSON.parse(list).find((el) => el.id === item.id) : false;
  const showError = useNotification('An error ocurred when adding the item to your list', 'error');
  const [updatingList, setUpdatingList] = useState({ status: false, message: '' });

  const handleList = () => {
    setUpdatingList({ status: true, message: isItemOnList ? 'Removing title from your list...' : 'Adding title to your list...' });
    if (!isItemOnList) {
      addItemToMyList(item.id).then(() => {
        setUpdatingList({ status: true, message: 'Added!' });
        setTimeout(() => {
          setUpdatingList({ status: false, message: '' });
        }, 2000);
      })
        .catch(() => {
          showError();
        });
    } else {
      removeItemFromMyList(item.id).then(() => {
        setUpdatingList({ status: true, message: 'Removed!' });
        setTimeout(() => {
          setUpdatingList({ status: false, message: '' });
        }, 2000);
      })
        .catch(() => {
          showError();
        });
    }
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <li
          key={`title-id-${item.id}`}
          className={`${styles.item} flex flex-col text-white ${index === 0 ? 'mr-4' : 'mx-4'} focus:border-primary`}
          tabIndex="-1"
          data-section="titles"
          data-title-id={item.id}
        >
          <Link href={`${TITLE_ROUTE}/${item.id}`}>
            <Tooltip.Root delayDuration={1200}>
              <Tooltip.Trigger>
                <div className="w-32 h-48 relative transition-all duration-300 rounded-lg border-2 border-transparent cursor-pointer hover:opacity-80 hover:border-primary">
                  <Image src={item.large_cover_image} className="rounded-md" layout="fill" quality={100} />
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content side="right">
                <div className="hidden md:flex flex-col bg-gray-800 shadow-md p-4 h-48 rounded-md text-xs w-80 mx-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white w-56">
                      {item.title}
                      &nbsp;(
                      {item.year}
                      )
                    </div>
                    <div className="flex items-center justify-items-center text-xs bg-primary text-white rounded-full py-0.5 px-2">
                      <StarIcon className={`${styles.starIcon} mr-1 w-2.5`} />
                      {item.rating}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 my-2">
                    {item.genres?.length && item.genres.join(', ')}
                    &nbsp;|&nbsp;
                    {item.runtime}
                    &nbsp;minutes
                  </p>
                  <div className={`${styles.hoverSummary} text-xs text-gray-300 overflow-hidden overflow-ellipsis`}>{item.summary || summaryUnavailablePlaceholder}</div>
                </div>
              </Tooltip.Content>
            </Tooltip.Root>
          </Link>
          <div className="flex flex-col items-start pt-2 pb-4">
            <div className="flex items-center w-32">
              <span className="overflow-x-hidden whitespace-nowrap overflow-ellipsis text-left font-semibold text-sm select-none">{item.title}</span>
              {isItemOnList && (
                <Tooltip.Root>
                  <Tooltip.Trigger delayDuration={500}>
                    {
                      !updatingList.status ? (
                        <button
                          type="button"
                          className="px-0.5 bg-primary rounded-lg ml-2 transition duration-300"
                          onClick={handleList}
                        >
                          <CheckIcon />
                        </button>
                      ) : (
                        <div className="ml-2">
                          <Spinner size="0.8rem" border="border-gray-600" />
                        </div>
                      )
                    }
                  </Tooltip.Trigger>
                  <Tooltip.Content side="right">
                    <div className="bg-gray-800 shadow-md p-2 rounded-md text-xs ml-4 text-white">
                      {updatingList.status ? updatingList.message : 'Remove title from your list'}
                    </div>
                  </Tooltip.Content>
                </Tooltip.Root>
              )}
            </div>
            <span className="text-xs text-gray-300 select-none">{item.year}</span>
          </div>
        </li>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <div className="flex flex-col py-2 px-2 bg-gray-800 shadow-xl rounded-md text-white">
          <div className="flex justify-between items-center pl-4 pr-2 py-1 select-none text-sm rounded-sm w-60 my-1 text-gray-300">
            {item.title}
          </div>
          <div className="border border-gray-700 my-1" />
          <Link href={`${STREAM_ROUTE}/${item.id}`}>
            <div className="flex justify-between items-center pl-4 pr-2 cursor-pointer py-1 hover:bg-primary text-sm rounded-sm w-full my-1 transition duration-300">
              <div className="flex items-center">
                <TriangleRightIcon className="mr-2 -ml-1" />
                Watch now
              </div>
            </div>
          </Link>
          <button
            type="button"
            className="flex items-center pl-4 pr-2 cursor-pointer py-1 hover:bg-primary text-sm rounded-sm w-full my-1 transition duration-300"
            onClick={() => {
              if (!updatingList.status) {
                handleList();
              }
            }}
          >
            {
              !updatingList.status ? (
                isItemOnList ? (
                  <>
                    <Cross2Icon className="mr-2 -ml-1" />
                    Remove title from my list
                  </>
                ) : (
                  <>
                    <PlusIcon className="mr-2 -ml-1" />
                    Add title to my list
                  </>
                )
              ) : (
                <div className="text-white flex items-center">
                  <Spinner size="0.65rem" color="#ffffff" border="border-transparent" />
                  <span className="ml-2">{updatingList.message}</span>
                </div>
              )
            }
          </button>
          <Link href={`${TITLE_ROUTE}/${item.id}`}>
            <div className="flex justify-between items-center pl-4 pr-2 cursor-pointer py-1 hover:bg-primary text-sm rounded-sm w-full my-1 transition duration-300">
              See more details
            </div>
          </Link>
        </div>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    large_cover_image: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
    year: PropTypes.number,
    rating: PropTypes.number,
    runtime: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Item;
