import {Outlet} from "react-router-dom";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import {useState} from "react";

export default function MainLayout() {
    const [toggleMenu, setToggleMenu] = useState(false);

    function handleMenuClicked() {
        setToggleMenu(prevState => !prevState)
    }

    return (
        <>
            <div className="app">
                <NavBar toggleMenu={toggleMenu} handleMenuClicked={handleMenuClicked}/>
                <div className="main_container">
                    <Header handleMenuClicked={handleMenuClicked}/>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
