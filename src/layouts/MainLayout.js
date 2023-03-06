import {Outlet} from "react-router-dom";
import NavBar from "../components/NavBar";

export default function MainLayout() {
    return (
        <>
            <div className="app">
                <div className="navbar" style={{backgroundImage: "url('/images/background.jpg')"}}>
                    <NavBar/>
                </div>
                <div className="main_container">
                    <Outlet/>
                </div>
            </div>

        </>
    )
}
