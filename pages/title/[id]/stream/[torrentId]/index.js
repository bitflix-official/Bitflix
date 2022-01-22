/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import React, {
  useContext, useState, useEffect,
} from 'react';
import AppContext from 'context/AppContext';
import { useRouter } from 'next/router';
import { TMDB_PHOTO_URL } from 'constants';
import { HOME_ROUTE } from 'routes';
import {
  Header, AppWrapper, BackButton, Spinner, Player,
} from 'components';
import { getTitleData } from 'api/titles';
import { startStreaming } from 'api/streaming';
import { useTranslation } from 'react-i18next';

const STREAMING_URL = process.env.NEXT_PUBLIC_STREAMING_URL;

const formatTracks = (subs) => {
  if (!subs) return null;
  const arr = [];
  Object.values(subs).forEach((sub) => {
    arr.push({
      label: sub.lang, kind: 'captions', srclang: sub.langcode, src: sub.vtt,
    });
  });
  return arr;
};

const Stream = ({ pageProps: { video, subs } }) => {
  const {
    data: { userData },
  } = useContext(AppContext);
  const [title, setTitle] = useState({});
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoIsDone, setVideoIsDone] = useState(false);
  const { query: { id, torrentId } } = useRouter();
  const streamingURL = `${STREAMING_URL}${video?.slice(14)}`;
  const videoOptions = {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: streamingURL,
      },
    ],
    tracks: formatTracks(subs),
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getTitleData(id, userData.language);
        setTitle(await data);
        return data;
      } catch (err) {
        throw new Error(err);
      }
    };
    if (id && userData !== undefined && !title.id) {
      getData();
    }
  }, [userData]);

  useEffect(() => {
    const getVideoProgress = async () => {
      const { progress } = await startStreaming(torrentId, title.imdb_id);
      setVideoProgress(progress);
      if (progress === 1) {
        setVideoIsDone(true);
      }
    };
    if (id && videoProgress !== 1) {
      setTimeout(() => {
        getVideoProgress();
      }, 4000);
    }
  }, [videoProgress]);

  const { t } = useTranslation();

  if (!videoIsDone || videoOptions.tracks?.length === 0) {
    return (
      <>
        <div style={{ backgroundImage: `url(${`${TMDB_PHOTO_URL}/${title.backdrop_path}`})` }} className="h-full absolute block w-full bg-no-repeat bg-cover opacity-10" />
        <div className="h-screen flex items-center justify-center text-white">
          <div className="flex flex-col items-center">
            <Spinner />
            <span className="font-bold text-white mt-4">
              {Math.round(videoProgress * 100)}
              %
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Header
        leftContent={(
          <BackButton link={HOME_ROUTE} customText={`${t('WATCHING')}: ${title.title}`} />
        )}
        transparent
      />
      <AppWrapper>
        <div className="h-screen flex items-center justify-center text-white">
          <Player {...videoOptions} />
        </div>
      </AppWrapper>
    </div>
  );
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps = async (context) => {
  const { params: { id, torrentId } } = context;
  try {
    const title = await getTitleData(id);
    const { video, subs } = await startStreaming(torrentId, await title.imdb_id);
    return { props: { video, subs } };
  } catch (err) {
    return { props: { video: null, subs: null } };
  }
};

Stream.propTypes = {
  pageProps: PropTypes.shape({
    video: PropTypes.string,
    subs: PropTypes.shape({}),
  }).isRequired,
};

export default Stream;
