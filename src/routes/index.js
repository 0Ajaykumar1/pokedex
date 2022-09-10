
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import PokemonPage from "../components/PokemonPage";


export default function AppRoute() {

    return (
        <Routes>
            <Route element={<App />}>
                <Route exact path={`${process.env.PUBLIC_URL}/pokemon/:id`} element={<PokemonPage />} />
                <Route exact path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
            </Route>
        </Routes>
    );
}