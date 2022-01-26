/* eslint-disable no-multi-assign */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable consistent-return */
import React, { useCallback, useEffect, useState } from 'react';
import videojs from 'video.js';

const Player = (props) => {
  const [videoEl, setVideoEl] = useState(null);
  const onVideo = useCallback((el) => {
    setVideoEl(el);
  }, []);

  useEffect(() => {
    if (!videoEl) return;
    const player = (videoEl.current = videojs(videoEl, props, () => {
      player.play();
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
      <video ref={onVideo} className="video-js vjs-big-play-centered mt-10" playsInline crossOrigin="anonymous" height={630} autoPlay />
    </div>
  );
};

export default Player;
