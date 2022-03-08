const STREAMING_URL = process.env.NEXT_PUBLIC_STREAMING_URL;
const TV_URL = process.env.NEXT_PUBLIC_TV_URL;
const SUBTITLES_URL = process.env.NEXT_PUBLIC_SUBTITLES_URL;

export const startStreaming = async (link, imdbid) => {
  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      link,
      imdbid,
    });
    const requestOptions = {
      headers,
      method: 'POST',
      body: raw,
      redirect: 'follow',
    };
    const res = await fetch(`${STREAMING_URL}/torrents`, requestOptions);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getStreamingData = async (id) => {
  try {
    const res = await fetch(`${STREAMING_URL}/torrents/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getTvSubtitles = async (query, season, episode) => {
  try {
    const res = await fetch(`${SUBTITLES_URL}/subs/tv/${query}/${season}/${episode}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getMovieSubtitles = async (id) => {
  try {
    const res = await fetch(`${SUBTITLES_URL}/subs/movie/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getTvStreamingData = async (name) => {
  try {
    const res = await fetch(`${TV_URL}/api/1337x/${name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
