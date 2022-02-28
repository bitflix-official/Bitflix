/* eslint-disable no-restricted-syntax */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { TMDB_EPISODE_PHOTO_URL } from 'constants';
import { useTranslation } from 'react-i18next';
import * as Popover from '@radix-ui/react-popover';
import { ChevronDownIcon, TriangleRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { getTvStreamingData } from 'api/streaming';
import { Spinner } from 'components';
import { STREAM_ROUTE, TITLE_ROUTE } from 'routes';
import { orderBy } from 'utils';
import styles from './id.module.css';

const TitleEpisodes = ({
  seasonSelected, title, seasons, episodes, handleShowSeason, tvName,
}) => {
  const { t } = useTranslation();
  const [openPopover, setOpenPopover] = useState(false);
  const [streamingEpisodes, setStreamingEpisodes] = useState([]);

  useEffect(async () => {
    setStreamingEpisodes([]);
    const newListOfEpisodes = [];
    for await (const episode of episodes) {
      const newEpisode = episode;
      if (!newEpisode.url) {
        const listOfTorrents = await getTvStreamingData(`${tvName?.replaceAll(' ', '.')}.S${seasonSelected.number > 9 ? seasonSelected.number : `0${seasonSelected.number}`}E${episode.episode_number > 9 ? episode.episode_number : `0${episode.episode_number}`}.web`);
        if (listOfTorrents.length > 0) {
          const torrentsWithMostSeeders = orderBy(listOfTorrents, (torrent) => +torrent.Seeders);
          const webTorrents = torrentsWithMostSeeders && torrentsWithMostSeeders.filter((file) => file.Name?.includes('tbs') || file.Name?.includes('TBS'));
          const finalTorrent = webTorrents && webTorrents.find((file) => file.Name?.includes('720') || file.Name?.includes('480'));
          newListOfEpisodes.push({
            ...newEpisode,
            url: finalTorrent?.Magnet ? encodeURIComponent(
              finalTorrent?.Magnet,
            ) : null,
          });
        } else {
          newListOfEpisodes.push(episode);
        }
      }
    }
    setStreamingEpisodes(newListOfEpisodes);
  }, [seasonSelected]);

  return (
    <div className={`flex flex-col ${streamingEpisodes.length === 0 ? 'overflow-x-hidden' : 'overflow-x-auto'}`}>
      <div className="flex flex-col z-20 mb-2">
        <div className="mb-4 w-48">
          <Popover.Root open={openPopover} onOpenChange={setOpenPopover}>
            <Popover.Trigger className="text-white cursor-pointer hover:bg-gray-800 absolute -ml-4 rounded-md px-4 py-2 transition duration-300 appearance-none">
              <div className="flex items-center">
                <span className="font-semibold mr-2">{seasonSelected.name}</span>
                <ChevronDownIcon />
              </div>
            </Popover.Trigger>
            <Popover.Content>
              <div className="text-white bg-black shadow-sm rounded-sm p-1 w-48 mt-2 flex flex-col">
                {seasons?.map((season, index) => (
                  <button
                    type="button"
                    className={`my-1 ${seasonSelected.name === season.name ? 'bg-primary' : 'bg-transparent hover:bg-gray-800'} cursor-pointer rounded-sm w-full py-1 transition duration-300 appearance-none`}
                    onClick={async () => {
                      await handleShowSeason(index, season);
                      setOpenPopover(false);
                    }}
                    key={`${title?.name}-season-${season.id}`}
                  >
                    {season.name}
                  </button>
                ))}
              </div>
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>
      <ul className="flex items-center mt-8 mb-6">
        {streamingEpisodes.length > 0 ? streamingEpisodes.map((episode) => (
          <Link href={episode.url ? `${TITLE_ROUTE}/${title?.id}${STREAM_ROUTE}/${episode.url}?type=tv` : '#'} key={`episode-${episode.id}`} tabindex="0">
            <li className={`group cursor-pointer flex flex-col transition duration-300 rounded-md text-white mr-8 ${episode.url ? 'cursor-pointer' : 'cursor-default'}`}>
              <div className="flex items-center justify-center h-28">
                <img src={`${TMDB_EPISODE_PHOTO_URL}${episode.still_path}`} className={`h-28 ${episode.url ? 'group-hover:opacity-30' : 'grayscale'} w-72 max-w-max rounded-md transition duration-200`} alt={`season-episode-pic-${episode.id}`} />
                {
                  episode.url && (
                    <div className={`${styles.iconContainer} opacity-0 group-hover:opacity-100 transition duration-200`}>
                      <TriangleRightIcon className={`${styles.playEpisodeIcon}`} />
                    </div>
                  )
                }
              </div>
              <span className="mt-2 overflow-x-hidden whitespace-nowrap overflow-ellipsis w-48">{`${episode.episode_number}. ${episode.name || episode.original_name}`}</span>
            </li>
          </Link>
        )) : (
          <div className="w-screen text-center flex flex-col items-center lg:mt-6">
            <Spinner />
            <span className="text-white text-base mt-4">{t('LOADING')}</span>
          </div>
        )}
      </ul>
    </div>
  );
};

TitleEpisodes.propTypes = {
  episodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleShowSeason: PropTypes.func,
  seasonSelected: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.number,
  }).isRequired,
  seasons: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
  tvName: PropTypes.string,
};

TitleEpisodes.defaultProps = {
  title: undefined,
  tvName: '',
  handleShowSeason: () => undefined,
};

export default TitleEpisodes;
