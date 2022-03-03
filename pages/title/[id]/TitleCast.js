import PropTypes from 'prop-types';
import React from 'react';
import { TMDB_CAST_PHOTO_URL, defaultProfilePicture } from 'constants';

const TitleCast = ({ cast }) => {
  if (!cast || cast.length === 0) return null;
  return (
    cast.map((person) => {
      if (person.profile_path) {
        return (
          <div className="flex flex-col mt-1 mr-8 ml-0 mb-2" key={`cast-person-${person.id}`}>
            <img
              src={`${TMDB_CAST_PHOTO_URL}${person.profile_path}`}
              className="rounded-md w-24 mx-auto"
              alt={`cast-person-${person.id}`}
              onError={({ currentTarget }) => {
                const img = currentTarget;
                img.onerror = null;
                img.src = defaultProfilePicture;
              }}
            />
            <span className="w-24 overflow-x-hidden overflow-ellipsis whitespace-nowrap text-white mt-2 text-center">{person.name}</span>
            <span className="w-24 overflow-x-hidden overflow-ellipsis whitespace-nowrap text-gray-300 text-center text-xs">
              As&nbsp;
              {person.character}
            </span>
          </div>
        );
      }
      return <div />;
    })
  );
};

TitleCast.propTypes = {
  cast: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default TitleCast;
