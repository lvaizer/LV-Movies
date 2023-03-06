import '../css/moviesList.css'
import {useSearchMovies} from "../utilities/Queries";
import Loader from "./Loader";
// noinspection ES6CheckImport
import {useSearchParams} from "react-router-dom";
import MovieItem from "./MovieItem";

export default function Search() {

    const [searchParams] = useSearchParams();

    const {
        data,
        fetchNextPage,
        isLoading,
        error
    } = useSearchMovies(searchParams.get('query'));

    function loadMore() {
        fetchNextPage().then();
    }

    function thereIsMorePages() {
        return data && data.pages && data.pages[0]['total_pages'] > data.pages.length
    }

    if (error) return <div>Error occurred please try again later :(</div>

    function getTotalResultsShowing() {
        let counter = 0;
        data && data.pages && data.pages.forEach(page => counter += page.results.length)
        return counter;
    }

    return (
        <div className="movies_list">
            <div className="movies_list__tabs_container">
                <h3>Showing {getTotalResultsShowing()} results
                    of {data && data.pages && data.pages[0]['total_results']}</h3>
            </div>
            <div className="movies_list__container">
                {data && data.pages && data.pages.map(page => page.results && page.results.map(movie =>
                    <MovieItem
                        key={movie.id}
                        {...movie}/>
                ))}
            </div>
            {isLoading && <Loader/>}
            {thereIsMorePages() &&
            <div onClick={loadMore} className="movies_list__load_more">... Load More ...</div>}
        </div>
    )

}
