import '../css/moviePage.css';
import {Link, useParams} from "react-router-dom";
import {useGetMovie} from "../Queries";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Loader from "./Loader";

export default function MoviePage() {
    const {id} = useParams();
    const dateOptions = {month: 'short', day: '2-digit', year: 'numeric'};

    const {
        data: movie,
        isLoading,
        error
    } = useGetMovie(id)

    function parseTime(minutes) {
        return Math.floor(minutes / 60) + 'h ' + (minutes - (Math.floor(minutes / 60) * 60)) + 'min'
    }

    function parseDate(time) {
        const date = new Date(time);
        return date.toLocaleDateString("en-US", dateOptions)
    }

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error</div>;

    return (
        <>
            <div className="moviePage__poster">
                <LazyLoadImage
                    className="moviePage__image"
                    alt="movie poster"
                    placeholder={<Loader/>}
                    src={`https://image.tmdb.org/t/p/original/${movie['backdrop_path']}`}
                />
                <div className="moviePage__footer"/>
                <div className="moviePage__gradient"/>
            </div>
            <div className="moviePage__details">
                <LazyLoadImage
                    className="moviePage__details_image"
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
                            <button className="moviePage__details_trailer_button">
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
