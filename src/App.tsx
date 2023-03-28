import { useSelector, useDispatch } from "react-redux";
import "./App.css";

import MovieActionTypes from "./redux/movie/action-types";

function App() {
    const { currentMovies } = useSelector(
        (rootReducer) => rootReducer.movieReducer
    );
    const dispatch = useDispatch();

    console.log(currentMovies);

    const handleClick = () => {
        dispatch({
            type: MovieActionTypes.GET,
            payload: "Senhor dos aneis",
        });
    };

    return (
        <div className="App">
            <h1>Hello world</h1>
            <button onClick={handleClick}>Alterando dispatch</button>
        </div>
    );
}

export default App;
