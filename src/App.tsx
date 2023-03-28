import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import axios from "axios";
import MovieActionTypes from "./redux/movie/action-types";
import { API_KEY, API_SITE } from "./utils/api";
import { useEffect, useState } from "react";

export interface RootObject {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
}

export interface Result {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: OriginalLanguage;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export enum OriginalLanguage {
    En = "en",
    Es = "es",
}

function App() {
    useEffect(() => {
        getMovies();
    }, []);

    const { currentMovies } = useSelector(
        (rootReducer) => rootReducer.movieReducer
    );
    const [moviesList, setMoviesList] = useState([]);

    const dispatch = useDispatch();

    console.log(currentMovies);

    const handleClick = () => {
        dispatch({
            type: MovieActionTypes.GET,
            payload: moviesList,
        });
    };

    const getMovies = async () => {
        try {
            const response = await fetch(
                `${API_SITE}/movie/popular?${API_KEY}&language=en-US&page=1`
            );
            const movieData = await response.json();
            setMoviesList(movieData.results);
            return movieData;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="page-container">
            <h1>Conheça Filmes populares</h1>
            <button className="get-btn" onClick={handleClick}>
                Executando o GET
            </button>

            {currentMovies ? (
                <div className="card-container">
                    {currentMovies.map((movie: Result) => {
                        return (
                            <div className="card">
                                <div className="card-header">
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                        alt=""
                                    />
                                </div>

                                <h2>{movie.title}</h2>
                                <span>{movie.release_date}</span>
                                {/* <button className="rate-btn" onClick={}>Avalie</button> */}
                            </div>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}

export default App;
