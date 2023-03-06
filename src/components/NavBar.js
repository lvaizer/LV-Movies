import {Link} from "react-router-dom";
import '../css/navbar.css';

export default function NavBar(props) {

    return (
        <>
            <div onClick={props.handleMenuClicked}
                 className={`navbar__overlay ${props.toggleMenu && 'open'}`}/>
            <div className={`navbar ${props.toggleMenu && 'open'}`}
                 style={{backgroundImage: "url('/images/background.jpg')"}}>
                <div className="navbar__container">
                    <div className="navbar__menu">
                        <Link onClick={props.handleMenuClicked} className="navbar__item"
                              to="/">Home</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
