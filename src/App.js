import './css/app.css';
import {Route, Routes} from "react-router-dom";
import MoviesList from "./components/MoviesList";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./components/NotFound";
import MoviePage from "./components/MoviePage";
import Search from "./components/Search";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<MoviesList/>}/>
                    <Route path="movie/:id" element={<MoviePage/>}/>
                    <Route path="search" element={<Search/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </>

    );
}

export default App;
