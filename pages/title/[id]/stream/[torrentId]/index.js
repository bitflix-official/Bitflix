/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, {
  useContext, useState, useEffect,
} from 'react';
import AppContext from 'context/AppContext';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { TMDB_PHOTO_URL } from 'constants';
import { HOME_ROUTE } from 'routes';
import {
  Header, BackButton, Spinner, Player,
} from 'components';
import { getTitleData } from 'api/titles';
import {
  getStreamingData, getTvSubtitles, getMovieSubtitles, startStreaming,
} from 'api/streaming';
import { useTranslation } from 'react-i18next';
import styles from './index.module.css';

const STREAMING_URL = process.env.NEXT_PUBLIC_STREAMING_URL;

const formatTracks = (subs, userLanguage) => {
  if (!subs) return null;
  const arr = [];
  Object.values(subs).forEach((sub) => {
    arr.push({
      label: sub.lang, kind: 'captions', srclang: sub.langcode, src: sub.vtt, default: sub.langcode === userLanguage,
    });
  });
  return arr;
};

const Stream = () => {
  const {
    data: { userData },
  } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const [title, setTitle] = useState({});
  const [torrent, setTorrent] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { query: { id, torrentId, type } } = useRouter();
  const [videoOptions, setVideoOptions] = useState({
    autoplay: true,
    controls: true,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getTitleData({ id, language: userData.language, type });
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

  useEffect(async () => {
    if (torrent && isLoading) {
      const { files } = await getStreamingData(torrent);
      if (files) {
        const { link } = await files.find((file) => file.name.endsWith('.mp4') || file.name.endsWith('.mkv'));
        setVideoOptions(
          { ...videoOptions, sources: `${STREAMING_URL}${link}#.mp4` },
        );
        setIsLoading(false);
      } else {
        setProgress(progress + 0.0000001);
      }
    }
  }, [torrent, progress, isLoading]);

  useEffect(async () => {
    const getStreaming = async () => {
      try {
        const { infoHash } = await startStreaming(torrentId);
        if (type === 'movie') {
          const { subs } = await getMovieSubtitles(title.imdb_id);
          setVideoOptions(
            { ...videoOptions, tracks: formatTracks(await subs, i18n.language) },
          );
        } else {
          const { subs } = await getTvSubtitles(title.original_name, 1, 2);
          setVideoOptions(
            { ...videoOptions, tracks: formatTracks(await subs, i18n.language) },
          );
        }
        setTorrent(infoHash);
      } catch (err) {
        throw new Error(err);
      }
    };
    if (process.browser && torrentId && title.id && !torrent) {
      await getStreaming();
    }
  }, [title.id]);

  if (isLoading) {
    return (
      <>
        {title.backdrop_path && (
          <div style={{ backgroundImage: `url(${`${TMDB_PHOTO_URL}/${title.backdrop_path}`})` }} className={`${styles.titleBackground} absolute block w-full bg-no-repeat bg-cover opacity-40 h-screen`} />
        )}
        <div className="flex items-center h-screen justify-center content-center z-20">
          <div className="flex flex-col items-center">
            <Spinner border="border-gray-400" />
            <span className={`${styles.loadingText} text-white mt-4`}>{t('LOADING')}</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Header
        leftContent={(
          <BackButton link={HOME_ROUTE} customText={`${t('WATCHING')}: ${title.title || title.name || title.original_name}`} />
        )}
        transparent
      />
      <div className="h-screen flex items-center justify-center text-white">
        {videoOptions.sources && videoOptions.tracks?.length > 0 && <Player {...videoOptions} name="media" />}
      </div>
    </div>
  );
};

export default Stream;
