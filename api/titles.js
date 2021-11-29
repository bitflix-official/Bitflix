import { YTS_API_URL } from '../constants';

export const getTitles = async ({
  page = 1, queryTerm = 0, genre = '', sortBy = 'date_added',
}) => {
  try {
    const res = await fetch(`${YTS_API_URL}/list_movies.json?page=${page}&query_term=${queryTerm}&genre=${genre}&sort_by=${sortBy}`);
    const data = res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getTitle = async (id) => {
  try {
    const res = await fetch(`${YTS_API_URL}/movie_details.json?movie_id=${id}`);
    const data = res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
