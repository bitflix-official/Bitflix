const STREAMING_URL = process.env.NEXT_PUBLIC_STREAMING_URL;
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

export const getSubtitles = async (id) => {
  try {
    const res = await fetch(`${SUBTITLES_URL}/subs/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
