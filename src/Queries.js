import {useQuery} from "react-query";
import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3/';
const MOVIE_URL = BASE_URL + 'movie/';
const TOP_MOVIES_URL = BASE_URL + 'movie/top_rated/';
const POPULAR_MOVIES_URL = BASE_URL + 'movie/popular/';
const NOW_PLAYING_MOVIES_URL = BASE_URL + 'movie/now_playing/';

export const useGetMovie = (id) => useQuery(['movie', id], () => axios(MOVIE_URL + id + '?api_key=' + process.env.API_KEY).then(res => res.data));
export const useGetTopRatedMovies = (start, page) => useQuery(['top_rated', page], () => axios(TOP_MOVIES_URL + '?api_key=' + process.env.API_KEY + '&page=' + page).then(res => res.data), {enabled: start});
export const useGetPopularMovies = (start, page) => useQuery(['popular', page], () => axios(POPULAR_MOVIES_URL + '?api_key=' + process.env.API_KEY + '&page=' + page).then(res => res.data), {enabled: start});
export const useGetNowPlayingMovies = (start, page) => useQuery(['nowPlaying', page], () => axios(NOW_PLAYING_MOVIES_URL + '?api_key=' + process.env.API_KEY + '&page=' + page).then(res => res.data), {enabled: start});

