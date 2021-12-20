const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'eb3951110f37c8ee30f5e146dc484168';

const getTrendingMovie = async () => {
  const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error('Somethimg went wrong'));
};

const getMoviesById = async id => {
  const url = `${BASE_URL}movie/${id}?api_key=${API_KEY}`;
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(new Error('somethimg went wrong'));
};

const getMovieCreditsById = async id => {
  const url = `${BASE_URL}movie/${id}/credits?api_key=${API_KEY}`;
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(new Error('somethimg went wrong'));
};

const getMovieReviewsById = async id => {
  const url = `${BASE_URL}movie/${id}/reviews?api_key=${API_KEY}`;
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(new Error('somethimg went wrong'));
};

const getSerchMovies = async serchName => {
  const url = `${BASE_URL}search/movie/?api_key=${API_KEY}&query=${serchName}`;
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error('somethimg went wrong'));
};

export {
  getTrendingMovie,
  getMoviesById,
  getSerchMovies,
  getMovieCreditsById,
  getMovieReviewsById,
};
