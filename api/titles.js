import { getFullDate } from 'utils';
import { TMDB_API_KEY, YTS_API_URL } from 'constants';

const TMDB_API_URL = 'https://api.themoviedb.org/3';

export const getTitles = async (
  {
    page = 1, genres = '', sortBy = 'popularity.desc', language = 'en-US', releaseDate = getFullDate(), withCompanies = '',
  },
) => {
  try {
    const shows = await fetch(`${TMDB_API_URL}/discover/tv?api_key=${TMDB_API_KEY}&sort_by=${sortBy}&release_date.lte=${releaseDate}&with_genres=${genres}&with_companies=${withCompanies}&include_adult=false&include_video=true&page=${page}&language=${language}`);
    const movies = await fetch(`${TMDB_API_URL}/discover/movie?api_key=${TMDB_API_KEY}&sort_by=${sortBy}&release_date.lte=${releaseDate}&with_genres=${genres}&with_companies=${withCompanies}&include_adult=false&include_video=true&page=${page}&language=${language}`);
    const { results: showsResults } = await shows.json();
    const { results: movieResults } = await movies.json();
    return { results: [...showsResults, ...movieResults] };
  } catch (err) {
    throw new Error(err);
  }
};

export const getImagesFromTitle = async (
  {
    type = 'movie', id, language = 'en',
  },
) => {
  try {
    const res = await fetch(`${TMDB_API_URL}/${type}/${id}/images?api_key=${TMDB_API_KEY}&language=${language}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const searchTitles = async (
  {
    page = 1, language = 'en-US', query = '',
  },
) => {
  try {
    const res = await fetch(`${TMDB_API_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${query}&include_adult=false&page=${page}&language=${language}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getTitleByIMDBId = async (id) => {
  try {
    const res = await fetch(`${YTS_API_URL}/list_movies.json?query_term=${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getTitleData = async ({ id, language = 'en-US', type = 'movie' }) => {
  try {
    const res = await fetch(`${TMDB_API_URL}/${type}/${id}?api_key=${TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getTitleCast = async ({ id, language = 'en-US', type = 'movie' }) => {
  try {
    const res = await fetch(`${TMDB_API_URL}/${type}/${id}/credits?api_key=${TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getSimilarTitles = async ({ id, language = 'en-US', type = 'movie' }) => {
  try {
    const res = await fetch(`${TMDB_API_URL}/${type}/${id}/similar?api_key=${TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getSeasonEpisodes = async ({ id, language = 'en-US', seasonNumber = 1 }) => {
  try {
    const res = await fetch(`${TMDB_API_URL}/tv/${id}/season/${seasonNumber}?api_key=${TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getShowExternalIds = async ({ id, language = 'en-US' }) => {
  try {
    const res = await fetch(`${TMDB_API_URL}/tv/${id}/external_ids?api_key=${TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${language}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
