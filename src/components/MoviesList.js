import '../css/moviesList.css'
import MovieItem from "./MovieItem";
import {useGetNowPlayingMovies, useGetPopularMovies, useGetTopRatedMovies} from "../Queries";
import Loader from "./Loader";
import {useEffect, useState} from "react";

const NOW_PLAYING = 'NOW_PLAYING';
const POPULAR = 'POPULAR';
const TOP_RATED = 'TOP_RATED';

export default function MoviesList() {

    const [selectedTab, setSelectedTab] = useState(NOW_PLAYING);

    const {
        data: nowPlaying,
        fetchNextPage: nowPlayingFetchNextPage,
        isLoading: nowPlayingLoading,
        error: nowPlayingError
    } = useGetNowPlayingMovies(selectedTab === NOW_PLAYING);

    const {
        data: popular,
        fetchNextPage: popularFetchNextPage,
        isLoading: popularLoading,
        error: popularError
    } = useGetPopularMovies(selectedTab === POPULAR);

    const {
        data: topRated,
        fetchNextPage: topRatedFetchNextPage,
        isLoading: topRatedLoading,
        error: topRatedError
    } = useGetTopRatedMovies(selectedTab === TOP_RATED);
    useEffect(() => {


    }, [])


    const isLoading = topRatedLoading || popularLoading || nowPlayingLoading;

    const isError = nowPlayingError || popularError || topRatedError;

    function handleTabClicked(tab) {
        setSelectedTab(tab);
    }

    function getMovies() {
        switch (selectedTab) {
            case NOW_PLAYING:
                return nowPlaying;
            case POPULAR:
                return popular;
            case TOP_RATED:
                return topRated;
            default:
                return;
        }
    }

    function loadMore() {
        switch (selectedTab) {
            case NOW_PLAYING:
                nowPlayingFetchNextPage().then();
                break;
            case POPULAR:
                popularFetchNextPage().then();
                break;
            case TOP_RATED:
                topRatedFetchNextPage().then();
                break;
            default:
                break;
        }
    }

    function getTabActiveClass(tab) {
        return selectedTab === tab ? 'active' : '';
    }

    if (isError) return <div>Error occurred please try again later :(</div>

    return (
        <div>
            <div className="movies_list__tabs_container">
                <div className={`movies_list__tabs_tab ${getTabActiveClass(NOW_PLAYING)}`}
                     onClick={() => handleTabClicked(NOW_PLAYING)}>
                    Now Playing
                </div>
                <div className={`movies_list__tabs_tab ${getTabActiveClass(POPULAR)}`}
                     onClick={() => handleTabClicked(POPULAR)}>
                    Popular
                </div>
                <div className={`movies_list__tabs_tab ${getTabActiveClass(TOP_RATED)}`}
                     onClick={() => handleTabClicked(TOP_RATED)}>
                    Top Rated
                </div>
            </div>
            <div className="movies_list__container">
                {getMovies() && getMovies().pages.map(page => page.results.map(movie =>
                    <MovieItem
                        key={movie.id}
                        {...movie}/>
                ))}
            </div>
            {isLoading && <Loader/>}
            <div onClick={loadMore} className="movies_list__load_more">... Load More ...</div>
        </div>
    )

}
