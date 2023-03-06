import '../css/moviesList.css'
import MovieItem from "./MovieItem";
import {useGetNowPlayingMovies, useGetPopularMovies, useGetTopRatedMovies} from "../Queries";
import Loader from "./Loader";
import {useState} from "react";

const NOW_PLAYING = 'NOW_PLAYING';
const POPULAR = 'POPULAR';
const TOP_RATED = 'TOP_RATED';

export default function MoviesList() {
    const [selectedTab, setSelectedTab] = useState(NOW_PLAYING);
console.log(process.env)
    const {
        data: nowPlaying,
        isLoading: nowPlayingLoading,
        error: nowPlayingError
    } = useGetNowPlayingMovies(selectedTab === NOW_PLAYING, 1);

    const {
        data: popular,
        isLoading: popularLoading,
        error: popularError
    } = useGetPopularMovies(selectedTab === POPULAR, 1);

    const {
        data: topRated,
        isLoading: topRatedLoading,
        error: topRatedError
    } = useGetTopRatedMovies(selectedTab === TOP_RATED, 1);


    function handleTabClicked(tab) {
        setSelectedTab(tab)
    }

    const isLoading = topRatedLoading || popularLoading || nowPlayingLoading;

    const isError = nowPlayingError || popularError || topRatedError;

    function getMovies() {
        switch (selectedTab) {
            case NOW_PLAYING:
                return nowPlaying ? nowPlaying.results : [];
            case POPULAR:
                return popular ? popular.results : [];
            case TOP_RATED:
                return topRated ? topRated.results : [];
            default:
                return [];
        }
    }

    function isTabActive(tab) {
        return selectedTab === tab ? 'active' : '';
    }

    if (isLoading) return <Loader/>

    if (isError) return <div>Error occurred please try again later :(</div>

    return (
        <div>
            <div className="movies_list__tabs_container">
                <div className={`movies_list__tabs_tab ${isTabActive(NOW_PLAYING)}`}
                     onClick={() => handleTabClicked(NOW_PLAYING)}>
                    Now Playing
                </div>
                <div className={`movies_list__tabs_tab ${isTabActive(POPULAR)}`}
                     onClick={() => handleTabClicked(POPULAR)}>
                    Popular
                </div>
                <div className={`movies_list__tabs_tab ${isTabActive(TOP_RATED)}`}
                     onClick={() => handleTabClicked(TOP_RATED)}>
                    Top Rated
                </div>
            </div>
            <div className="movies_list__container">
                {getMovies() && getMovies().map(movie =>
                    <MovieItem
                        key={movie.id}
                        {...movie}/>
                )}
            </div>
        </div>
    )

}
