/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useNotification } from 'hooks';
import AppContext from 'context/AppContext';
import * as ContextMenu from '@radix-ui/react-context-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  TriangleRightIcon, PlusIcon, Cross2Icon, StarIcon,
} from '@radix-ui/react-icons';
import { summaryUnavailablePlaceholder, TMDB_PHOTO_URL, genres } from 'constants';
import { Spinner } from 'components';
import { getGenresNames, getTitleYear, humanizeGenres } from 'utils';
import { LOGIN_ROUTE, STREAM_ROUTE, TITLE_ROUTE } from 'routes';
import styles from './item.module.css';

const Item = ({ item, index }) => {
  const { push } = useRouter();
  const { t } = useTranslation();
  const {
    data: { userData: { id: userId, list } = {} },
    actions: { addItemToMyList, removeItemFromMyList },
  } = useContext(AppContext);
  const isItemOnList = list ? JSON.parse(list).find((el) => el.id === item.id) : false;
  const showError = useNotification('An error ocurred when adding the item to your list', 'error');
  const [updatingList, setUpdatingList] = useState({ status: false, message: '' });

  const handleList = () => {
    if (!userId) {
      push(LOGIN_ROUTE);
    } else {
      setUpdatingList({ status: true, message: isItemOnList ? t('REMOVING_TITLE_FROM_YOUR_LIST') : t('ADDING_TITLE_TO_YOUR_LIST') });
      if (!isItemOnList) {
        addItemToMyList(item.id).then(() => {
          setUpdatingList({ status: true, message: t('ADDED') });
          setTimeout(() => {
            setUpdatingList({ status: false, message: '' });
          }, 2000);
        })
          .catch(() => {
            showError();
          });
      } else {
        removeItemFromMyList(item.id).then(() => {
          setUpdatingList({ status: true, message: t('REMOVED') });
          setTimeout(() => {
            setUpdatingList({ status: false, message: '' });
          }, 2000);
        })
          .catch(() => {
            showError();
          });
      }
    }
  };

  if (!TMDB_PHOTO_URL && !item.imdb_id) return null;

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <li
          key={`title-id-${item.id}`}
          className={`${styles.item} flex flex-col text-white ${index === 0 ? 'mr-4' : 'mx-4'} focus:border-primary pb-4`}
          tabIndex="-1"
          data-section="titles"
          data-title-id={item.id}
        >
          <Tooltip.Root delayDuration={1200}>
            <Tooltip.Trigger>
              <Link href={`${TITLE_ROUTE}/${item.id}`}>
                <div className="w-36 h-52 relative transition-all duration-300 rounded-lg border-2 border-transparent cursor-pointer hover:opacity-80 hover:border-primary">
                  <Image src={`${TMDB_PHOTO_URL}/${item.poster_path}`} className="rounded-md" layout="fill" quality={100} priority />
                </div>
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Content side="right">
              <div className="hidden md:flex flex-col bg-gray-800 shadow-md p-4 h-52 rounded-md text-xs w-80 mx-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white w-56">
                    {item.title}
                    &nbsp;(
                    {getTitleYear(item.release_date)}
                    )
                  </div>
                  <div className="flex items-center justify-items-center text-xs bg-primary text-white rounded-full py-0.5 px-2">
                    <StarIcon className={`${styles.starIcon} mr-1 w-2.5`} />
                    {item.vote_average}
                  </div>
                </div>
                <p className="text-xs text-gray-400 my-2">
                  {
                    item.genres ? item?.genres && humanizeGenres(getGenresNames(genres.map((genre) => (
                      { ...genre, name: t(genre.name) }
                    )), item.genres.map((genre) => genre.id)))
                      : humanizeGenres(getGenresNames(genres.map((genre) => (
                        { ...genre, name: t(genre.name) }
                      )), item.genre_ids))
                  }
                </p>
                <div className={`${styles.hoverSummary} text-xs text-gray-300 overflow-hidden overflow-ellipsis`}>{item.overview || t(summaryUnavailablePlaceholder)}</div>
              </div>
            </Tooltip.Content>
          </Tooltip.Root>
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
                {t('WATCH_NOW')}
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
                    {t('REMOVE_FROM_LIST')}
                  </>
                ) : (
                  <>
                    <PlusIcon className="mr-2 -ml-1" />
                    {t('ADD_TO_LIST')}
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
              {t('SEE_MORE_DETAILS')}
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
    imdb_id: PropTypes.string,
    poster_path: PropTypes.string,
    title: PropTypes.string,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    genres: PropTypes.arrayOf(),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Item;
