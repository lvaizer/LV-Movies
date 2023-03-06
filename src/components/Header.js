import '../css/header.css';
import {useState} from "react";
import useSearchDebounce from "../utilities/useSearchDebounce";
// noinspection ES6CheckImport
import {Navigate, useSearchParams} from "react-router-dom";

export default function Header({handleMenuClicked}) {
    const [search, setSearch] = useState('');

    const [searchParams] = useSearchParams();

    if (!search && searchParams.get('query')) setSearch(searchParams.get('query'))

    const debouncedSearchTerm = useSearchDebounce(search, 300);

    if (debouncedSearchTerm.get('query') && !window.location.href.includes('search')) return <Navigate
        to={`./search?query=${debouncedSearchTerm.get('query')}`}/>;

    return (
        <div className="header-wraper">
            <div className="header">
                <button className="header__toggle-btn" onClick={handleMenuClicked}>
                    <div className="header__hamburger"/>
                    <div className="header__hamburger"/>
                    <div className="header__hamburger"/>
                </button>
                <form className="header__searchbar_form">
                    <div className="header__searchbar_container">
                        <input autoFocus={window.location.href.includes('search')}
                               type="text"
                               value={search}
                               onChange={(e) => {
                                   setSearch(e.target.value)
                               }}
                               className="header__searchbar_input"
                               placeholder="Search"/>
                    </div>
                </form>

            </div>
        </div>
    )
}
