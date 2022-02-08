import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { TMDB_EPISODE_PHOTO_URL } from 'constants';
import * as Popover from '@radix-ui/react-popover';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const TitleEpisodes = ({
  seasonSelected, title, seasons, episodes, handleShowSeason,
}) => {
  const [openPopover, setOpenPopover] = useState(false);
  return (
    <div className="flex flex-col">
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
                    onClick={() => {
                      handleShowSeason(index, season);
                      setOpenPopover(false);
                    }}
                    key={`${title.name}-season-${season.id}`}
                  >
                    {season.name}
                  </button>
                ))}
              </div>
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>
      <div className="flex items-center mt-8 mb-6">
        {episodes.map((episode) => (
          <div className="cursor-pointer flex flex-col transition duration-300 rounded-md text-white mr-8">
            <img src={`${TMDB_EPISODE_PHOTO_URL}${episode.still_path}`} className="h-28 w-72 max-w-max rounded-md" alt={`season-episode-pic-${episode.id}`} />
            <span className="mt-2 overflow-x-hidden whitespace-nowrap overflow-ellipsis w-48">{`${episode.episode_number}. ${episode.name || episode.original_name}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

TitleEpisodes.propTypes = {
  episodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleShowSeason: PropTypes.func.isRequired,
  seasonSelected: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  seasons: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default TitleEpisodes;
