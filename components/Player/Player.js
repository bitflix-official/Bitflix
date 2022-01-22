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
    if (videoEl == null) return;
    videojs(videoEl, props);
    if (videoEl) {
      setTimeout(() => {
        videoEl.play();
      }, 1000);
    }
  }, [props, videoEl]);

  return (
    <div data-vjs-player>
      <video ref={onVideo} className="video-js vjs-big-play-centered mt-10" playsInline crossOrigin="allow" height={630} autoPlay />
    </div>
  );
};

export default Player;
