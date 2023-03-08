import '../css/header.css';
import {useState} from "react";
import useSearchDebounce from "../utilities/useSearchDebounce";
import {useSearchMovies} from "../utilities/Queries";
import Loader from "./Loader";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {EMPTY_IMAGE} from "../utilities/Constants";

export default function Header({handleMenuClicked}) {

    const [search, setSearch] = useState('');

    const debouncedSearchTerm = useSearchDebounce(search, 300);

    const {data} = useSearchMovies(debouncedSearchTerm);

    return (
        <div className="header-wraper">
            <div className="header">
                <button className="header__toggle-btn" aria-label="menu"  onClick={handleMenuClicked}>
                    <div className="header__hamburger"/>
                    <div className="header__hamburger"/>
                    <div className="header__hamburger"/>
                </button>
                <form className="header__searchbar_form">
                    <div className="header__searchbar_container">
                        <input type="text"
                               value={search}
                               onChange={(e) => {
                                   setSearch(e.target.value)
                               }}
                               className="header__searchbar_input"
                               placeholder="Search"/>
                        <div className="header__searchbar_autocomplete_container">
                            {data && data.results.map(movie =>
                                <div
                                    onClick={() => window.location.href = '/movie/' + movie.id}
                                    key={movie.id}
                                    className="header__searchbar_autocomplete_item">
                                    <LazyLoadImage placeholder={<Loader/>}
                                                   className="header__searchbar_autocomplete_item_image"
                                                   onError={(e) => e.target.src = EMPTY_IMAGE}
                                                   alt="movie poster"
                                                   src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}/>
                                    <div
                                        className="header__searchbar_autocomplete_item_text_container">
                                        <h4 className="header__searchbar_autocomplete_item_title"> {movie.title}</h4>
                                        <span
                                            className="header__searchbar_autocomplete_item_year"> {new Date(movie.release_date).getFullYear()}</span>
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
