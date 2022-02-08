import PropTypes from 'prop-types';
import React from 'react';
import { TMDB_CAST_PHOTO_URL } from 'constants';

const TitleCast = ({ cast }) => {
  if (!cast || cast.length === 0) return null;
  return (
    cast.map((person) => (
      <div className="flex flex-col mt-1 mr-0 ml-0 mb-2 px-1" key={`cast-person-${person.id}`}>
        <img src={`${TMDB_CAST_PHOTO_URL}${person.profile_path}`} className="rounded-full h-20 w-20 mx-auto border" alt={`cast-person-${person.id}`} />
        <span className="w-36 overflow-x-hidden overflow-ellipsis whitespace-nowrap text-white mt-2 text-center">{person.name}</span>
        <span className="w-36 overflow-x-hidden overflow-ellipsis whitespace-nowrap text-gray-300 text-center text-xs">
          As&nbsp;
          {person.character}
        </span>
      </div>
    ))
  );
};

TitleCast.propTypes = {
  cast: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default TitleCast;
