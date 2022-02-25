/* eslint-disable no-multi-assign */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable consistent-return */
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import videojs from 'video.js';

const Player = (props) => {
  const [videoEl, setVideoEl] = useState(null);
  const { tracks } = props;
  const onVideo = useCallback((el) => {
    setVideoEl(el);
  }, []);

  useEffect(() => {
    if (!videoEl) return;
    const player = (videoEl.current = videojs(videoEl, props, () => {
      setTimeout(() => {
        if (player?.play) {
          player.play();
        }
      }, 500);
    }));
    return () => {
      if (player) {
        player.dispose();
        videoEl.current = null;
      }
    };
  }, [props, videoEl]);

  return (
    <div data-vjs-player>
      <video ref={onVideo} className="video-js vjs-big-play-centered h-screen w-screen" playsInline crossOrigin="anonymous" autoPlay>
        {/* This mapping is added in order to make subtitles work on Safari */}
        {
          tracks?.length && (
            tracks.map((track) => (
              <track className="safari-subtitles" label={track.label} kind="captions" srcLang={track.srclang} src={track.src} default={track.default} key={`track-key-${track.src}`} />
            ))
          )
        }
      </video>
    </div>
  );
};

Player.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Player;
