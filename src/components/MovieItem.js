import '../css/MovieItem.css'
import {Link} from "react-router-dom";

export default function MovieItem(props) {
    const {id, original_title, poster_path, release_date, vote_average} = props;

    return (
        <div className="movie-item__container">
            <Link className="movie-item__link" to={`/movie/${id}`}>
                <img
                    alt="movie poster"
                    className="movie-item__image"
                    src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                />
                <div className="movie-item__footer">
                    <p className="movie-item__title">
                        {original_title}
                    </p>
                    <div className="movie-item__meta_container">
                        <span
                            className="movie-item__meta_container__year">{new Date(release_date).getFullYear()}
                        </span>
                        <span className="movie-item__meta_container__rank">
                            {vote_average}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}
