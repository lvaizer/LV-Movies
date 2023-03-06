import {Link} from "react-router-dom";
import '../css/navbar.css';

export default function NavBar() {
    return (
        <div className="navbar__container">
            <div className="navbar__menu">
                <Link className="navbar__item" to="/">Home</Link>
            </div>
        </div>
    )
}
