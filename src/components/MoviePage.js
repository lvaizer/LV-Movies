import '../css/moviePage.css';
import {Link, useParams} from "react-router-dom";
import {useGetMovie, useGetMovieVideo} from "../utilities/Queries";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Loader from "./Loader";
import {EMPTY_IMAGE} from "../utilities/Constants";

export default function MoviePage() {
    const {id} = useParams();
    const dateOptions = {month: 'short', day: '2-digit', year: 'numeric'};

    const {
        data: movie,
        isLoading,
        error
    } = useGetMovie(id);

    const {data: videos} = useGetMovieVideo(id);

    function parseTime(minutes) {
        return Math.floor(minutes / 60) + 'h ' + (minutes - (Math.floor(minutes / 60) * 60)) + 'min'
    }

    function parseDate(time) {
        const date = new Date(time);
        return date.toLocaleDateString("en-US", dateOptions)
    }

    function watchTrailerClicked() {
        if (!videos || !videos.results) return;
        for (let i = 0; i < videos.results.length; i++) {
            const video = videos.results[i];
            if (video.name.toLowerCase().includes('trailer') && video.site === 'YouTube') {
                window.open('https://www.youtube.com/watch?v=' + video.key, '_blank');
                break;
            }
        }
    }

    if (isLoading) return <Loader/>;

    if (error) return <div>Error</div>;

    return (
        <>
            <div className="moviePage__poster">
                <LazyLoadImage
                    className="moviePage__image"
                    alt="movie poster"
                    placeholder={<Loader/>}
                    onError={(e) => e.target.src = EMPTY_IMAGE}
                    src={`https://image.tmdb.org/t/p/original/${movie['backdrop_path']}`}
                />
                <div className="moviePage__footer"/>
                <div className="moviePage__gradient"/>
            </div>
            <div className="moviePage__details">
                <LazyLoadImage
                    className="moviePage__details_image"
                    onError={(e) => e.target.src = EMPTY_IMAGE}
                    alt="movie poster"
                    placeholder={<Loader/>}
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie['poster_path']}`}/>
                <div className="moviePage__details_container">
                    <h1 className="moviePage__details_title">{movie['original_title']}</h1>
                    <div className="moviePage__details_info">
                        <div className="moviePage__details_info_genres">
                            {movie['genres'].map(genre =>
                                <Link
                                    key={genre.id}
                                    className="moviePage__details_info_genres_item"
                                    to={"#"}>{genre.name}
                                </Link>)}
                        </div>
                        <div className="moviePage__details_info_date">
                            {parseTime(movie.runtime)}
                            <span> • </span>
                            {parseDate(movie['release_date'])}
                        </div>
                    </div>
                    <div className="moviePage__details_trailer">
                        <div className="moviePage__details_trailer_button_container">
                            <button className="moviePage__details_trailer_button"
                                    onClick={watchTrailerClicked}>
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 22v-20l18 10-18 10z"/>
                                </svg>
                                Play Trailer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="moviePage__overview">
                <h2>Synopsis</h2>
                <p>{movie['overview']}</p>
            </div>
        </>
    )
}
