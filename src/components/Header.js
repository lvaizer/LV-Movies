import '../css/header.css';

export default function Header({handleMenuClicked}) {
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
                        <input type="text" className="header__searchbar_input"
                               placeholder="Search"/>
                    </div>
                </form>

            </div>
        </div>
    )
}
