import { YTS_API_URL } from '../constants';

export const getTitles = async ({ page = 1, queryTerm = 0, genre = '' }) => {
  try {
    const data = await fetch(`${YTS_API_URL}/list_movies.json?page=${page}&query_term=${queryTerm}&genre=${genre}`);
    const res = data.json();
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const getTitle = async (id) => {
  try {
    const data = await fetch(`${YTS_API_URL}/movie_details.json?movie_id=${id}`);
    const res = data.json();
    return res;
  } catch (err) {
    throw new Error(err);
  }
};
