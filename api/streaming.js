const STREAMING_URL = process.env.NEXT_PUBLIC_STREAMING_URL;

export const startStreaming = async (id, imdbid) => {
  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      id,
      imdbid,
    });
    const requestOptions = {
      headers,
      method: 'POST',
      body: raw,
      redirect: 'follow',
    };
    const res = await fetch(`${STREAMING_URL}/download`, requestOptions);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
