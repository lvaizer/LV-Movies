import {useInfiniteQuery, useQuery} from "react-query";
import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3/';
const MOVIE_URL = BASE_URL + 'movie/';
const TOP_MOVIES_URL = BASE_URL + 'movie/top_rated/';
const POPULAR_MOVIES_URL = BASE_URL + 'movie/popular/';
const NOW_PLAYING_MOVIES_URL = BASE_URL + 'movie/now_playing/';
const SEARCH_MOVIES_URL = BASE_URL + 'search/movie';

export const useGetMovie = (id) =>
    useQuery(
        ['movie', id],
        () => axios(MOVIE_URL + id + '?api_key=' + process.env.REACT_APP_API_KEY).then(res => res.data));

export const useGetNowPlayingMovies = (start) =>
    useInfiniteQuery(
        ['nowPlaying'],
        ({pageParam = 1}) => axios(NOW_PLAYING_MOVIES_URL + '?api_key=' + process.env.REACT_APP_API_KEY + '&page=' + pageParam).then(res => res.data),
        {
            enabled: start,
            getNextPageParam: (lastPage, allPages) => allPages.length + 1
        });


export const useGetPopularMovies = (start) =>
    useInfiniteQuery(
        ['popular'],
        ({pageParam = 1}) => axios(POPULAR_MOVIES_URL + '?api_key=' + process.env.REACT_APP_API_KEY + '&page=' + pageParam).then(res => res.data),
        {
            enabled: start,
            getNextPageParam: (lastPage, allPages) => allPages.length + 1
        });

export const useGetTopRatedMovies = (start) =>
    useInfiniteQuery(
        ['top_rated'],
        ({pageParam = 1}) => axios(TOP_MOVIES_URL + '?api_key=' + process.env.REACT_APP_API_KEY + '&page=' + pageParam).then(res => res.data),
        {
            enabled: start,
            getNextPageParam: (lastPage, allPages) => allPages.length + 1
        });

export const useSearchMovies = (query) =>
    useQuery(
        ['search', query],
        () => axios(SEARCH_MOVIES_URL + '?query=' + query + '&api_key=' + process.env.REACT_APP_API_KEY).then(res => res.data),
    );

export const useGetMovieVideo = (id) =>
    useQuery(
        ['video', id],
        () => axios(MOVIE_URL + id + '/videos?api_key=' + process.env.REACT_APP_API_KEY).then(res => res.data),
    );
