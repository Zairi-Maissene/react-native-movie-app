import { API_KEY } from './constants';
import { BASE_API_URL } from './constants';

export const fetchMovies = async (debouncedSearch: string, currentPage: number) => {
  const response = await fetch(`${BASE_API_URL}?s=${debouncedSearch}&apikey=${API_KEY}&page=${currentPage}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = await response.json();
  if (data.Response === 'False') {
    throw new Error('No movies matching the search term were found.');
  }
  return data;
}

export const fetchMovieDetails = async (imdbID: string) => {
  const response = await fetch(`${BASE_API_URL}?i=${imdbID}&apikey=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  const data = await response.json();
  if (data.Response === 'False') {
    throw new Error('No movie details found.');
  }
  return data;
}