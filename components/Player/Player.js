/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable consistent-return */
import React, { useCallback, useEffect, useState } from 'react';
import videojs from 'video.js';

const Player = (props) => {
  const [videoEl, setVideoEl] = useState(null);
  const [videoWasPlayed, setVideoWasPlayed] = useState(false);
  const onVideo = useCallback((el) => {
    setVideoEl(el);
  }, []);

  useEffect(() => {
    if (videoEl == null) return;
    videojs(videoEl, props);
    if (videoEl && !videoWasPlayed) {
      setTimeout(() => {
        videoEl.play();
        setVideoWasPlayed(true);
      }, 500);
    }
  }, [props, videoEl]);

  return (
    <div data-vjs-player>
      <video ref={onVideo} className="video-js vjs-big-play-centered mt-10" playsInline crossOrigin="anonymous" height={630} autoPlay />
    </div>
  );
};

export default Player;
