/* eslint-disable react/jsx-indent */
/* eslint-disable no-nested-ternary */
import React, { useContext, useState, useEffect } from 'react';
import AppContext from 'context/AppContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  HOME_ROUTE, STREAM_ROUTE, LOGIN_ROUTE, TITLE_ROUTE,
} from 'routes';
import {
  Header, AppWrapper, BackButton, Loading, Spinner,
} from 'components';
import { useNotification } from 'hooks';
import {
  StarIcon, PlusIcon, TriangleRightIcon, Cross2Icon,
} from '@radix-ui/react-icons';
import {
  getTitleData, getTitleByIMDBId, getTitleCast, getSimilarTitles,
} from 'api/titles';
import { summaryUnavailablePlaceholder, genres, TMDB_PHOTO_URL } from 'constants';
import { getGenresNames, humanizeGenres, isLastItem } from 'utils';
import { useTranslation } from 'react-i18next';
import styles from './id.module.css';
import TitleCast from './TitleCast';
import SimilarTitles from './SimilarTitles';

const getViews = ({ cast = [], titles = [] }) => ([
  {
    id: 1,
    name: 'CAST',
    component: <TitleCast cast={cast} />,
  },
  {
    id: 2,
    name: 'SIMILAR_TITLES',
    component: <SimilarTitles items={titles} />,
  },
]);

const Title = () => {
  const [title, setTitle] = useState({});
  const [streamingData, setStreamingData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {
    data: { userData = {}, userData: { id: userId, list } = {} },
    actions: { addItemToMyList, removeItemFromMyList },
  } = useContext(AppContext);
  const isItemOnList = list ? JSON.parse(list).find((el) => el.id === title.id) : false;
  const showError = useNotification('An error ocurred when adding the item to your list', 'error');
  const [updatingList, setUpdatingList] = useState({ status: false, message: '' });
  const [prevImdbId, setPrevImdbId] = useState(title?.imdb_id);
  const [titleCast, setTitleCast] = useState([]);
  const [similarTitles, setSimilarTitles] = useState([]);
  const [currentView, setCurrentView] = useState(null);
  const { t, i18n } = useTranslation();
  const { push, query: { id, type } } = useRouter();
  const [prevId, setPrevId] = useState(id);
  const titleIsValid = title.id;
  const fullHDTorrent = streamingData?.torrents
    .filter((torrent) => torrent.quality === '1080p');

  const hdTorrent = streamingData?.torrents
    .filter((torrent) => torrent.quality === '720p');

  useEffect(() => {
    const getData = async () => {
      try {
        if (prevId === id && title.id) return null;
        setPrevId(id);
        const data = await getTitleData({ id, language: i18n.language, type });
        const { cast } = await getTitleCast({ id, language: i18n.language, type });
        const { results: similar } = await getSimilarTitles({ id, language: i18n.language, type });
        setTitle(await data);
        setTitleCast(await cast);
        setSimilarTitles(similar);
        setCurrentView(getViews({ cast, titles: similar })[0]);
        setIsLoading(false);
        return data;
      } catch (err) {
        throw new Error(err);
      }
    };
    if (id && userData !== undefined) {
      getData();
    }
  }, [userData, id]);

  useEffect(() => {
    const getStreamingData = async () => {
      try {
        const { data: { movies } } = await getTitleByIMDBId(title.imdb_id);
        const [movie] = await movies;
        setStreamingData(await movie);
        setPrevImdbId(title.imdb_id);
        return movie;
      } catch (err) {
        setStreamingData(null);
        return err;
      }
    };
    if ((title.imdb_id && !streamingData) || (title.imdb_id !== prevImdbId)) {
      getStreamingData();
    }
  }, [title]);

  const handleList = () => {
    if (!userId) {
      push(LOGIN_ROUTE);
    } else {
      setUpdatingList({ status: true, message: isItemOnList ? t('REMOVING_TITLE_FROM_YOUR_LIST') : t('ADDING_TITLE_TO_YOUR_LIST') });
      if (!isItemOnList) {
        addItemToMyList(title.id, title.first_air_date ? 'tv' : 'movie').then(() => {
          setUpdatingList({ status: true, message: t('ADDED') });
          setTimeout(() => {
            setUpdatingList({ status: false, message: '' });
          }, 2000);
        })
          .catch(() => {
            showError();
          });
      } else {
        removeItemFromMyList(title.id).then(() => {
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

  const shortTitleInfo = [
    {
      id: 1,
      value: title?.release_date || title?.first_air_date,
    },
    {
      id: 2,
      value: <>
        <StarIcon className={`${styles.starIcon} mr-1 w-2.5`} />
        {title?.vote_average}
             </>,
    },
    {
      id: 3,
      value: type === 'movie' ? `${title?.runtime} ${t('MINUTES').toLowerCase()}` : `${title.number_of_seasons} ${t('SEASONS').toLowerCase()}`,
    },
    {
      id: 4,
      value: title?.genres && humanizeGenres(getGenresNames(genres.map((genre) => (
        { ...genre, name: t(genre.name) }
      )), title.genres.map((genre) => genre.id))),
    },
    {
      id: 5,
      value: fullHDTorrent?.length > 0 ? 'Full HD' : 'HD',
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (process.browser && !isLoading && !titleIsValid) {
    push('/404');
  }

  return (
    <div>
      <Header
        leftContent={(
          <BackButton link={HOME_ROUTE} />
        )}
        transparent
      />
      <div style={{ backgroundImage: `linear-gradient(to bottom, transparent, #000 80%), url(${`${TMDB_PHOTO_URL}/${title.backdrop_path}`})` }} className={`${styles.titleBackground} absolute block w-full bg-no-repeat bg-cover opacity-50`} />
      <AppWrapper>
        <div className="flex flex-col justify-center w-full z-20 mt-32">
          <div className="flex flex-col w-11/12">
            <h1 className="text-white font-semibold text-3xl">{title.title || title.name}</h1>
            <div className="flex items-center text-gray-300 text-sm mt-4 -ml-1">
              {
                shortTitleInfo.map((info, index) => (
                  isLastItem(index, shortTitleInfo)
                    ? streamingData && <span key={`info-item-${info.id}`} className="mx-1 px-1 border border-text-gray-300">{info.value}</span>
                    : (
                      <span key={`info-item-${info.id}`} className="mx-1 flex items-center">
                        {info.value}
                        &nbsp;&nbsp;|&nbsp;
                      </span>
                    )
                ))
              }
            </div>
            <span className="text-gray-200 mt-4 w-5/6">{title.overview || t(summaryUnavailablePlaceholder)}</span>
            <div className="flex flex-col md:flex-row md:items-center mt-8 w-max">
              {
                streamingData ? (
                  <Link href={`${TITLE_ROUTE}/${title.id}${STREAM_ROUTE}/${fullHDTorrent.length ? fullHDTorrent[0].hash : hdTorrent[0].hash}`}>
                    <span
                      className="flex items-center bg-primary hover:bg-blue-700 border border-primary hover:border-blue-700 text-white py-1 px-8 text-md rounded-sm cursor-pointer transition duration-300"
                    >
                      <TriangleRightIcon className="mr-1" />
                      {t('WATCH_NOW')}
                    </span>
                  </Link>
                ) : (
                  <span
                    className="flex items-center bg-gray-600 text-white cursor-default py-1 px-8 text-md rounded-sm"
                  >
                    <TriangleRightIcon className="mr-1" />
                    {t('NOT_AVAILABLE')}
                  </span>
                )
              }
              <button
                type="button"
                className="flex items-center border border-gray-500 hover:border-gray-200 md:ml-4 mt-4 md:mt-0 bg-transparent text-white py-1 px-6 text-md rounded-sm cursor-pointer transition duration-300"
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
            </div>
          </div>
        </div>
        <div className="flex flex-col z-20 mt-24 h-96">
          <span className="text-3xl mb-8 text-white font-semibold">{t('DETAILS')}</span>
          <div className="flex items-center mb-6">
            {getViews({ cast: titleCast, titles: similarTitles }).map((view, index) => (
              <button
                type="button"
                className={`text-xl cursor-pointer transition duration-300 mr-8 px-2 py-1 text-gray-200 border-b-2 ${currentView.id === view.id ? 'border-primary' : 'border-transparent'}`}
                onClick={() => {
                  setCurrentView(getViews({ cast: titleCast, titles: similarTitles })[index]);
                }}
                key={`view-${view.id}`}
              >
                {t(view.name)}
              </button>
            ))}
          </div>
          <div className="flex items-center overflow-x-auto">
            {currentView.component}
          </div>
        </div>
      </AppWrapper>
    </div>
  );
};

export default Title;
