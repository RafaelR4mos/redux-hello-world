import { useSelector, useDispatch } from "react-redux";
import { API_KEY, API_SITE } from "./utils/api";
import { useEffect, useState } from "react";
import { Heart, X } from "@phosphor-icons/react";
import { IMovie } from "./utils/interface";
import {
    getMovieReducerSuccess,
    getMovieReducerError,
    addMovieToFavorite,
    filterOnlyFavorites,
    deleteMovieFromList,
} from "./redux/movie/slice";
import { RootState } from "./redux/rootReducer";

import "./App.css";

function App() {
    const dispatch = useDispatch();
    const { movies, error, favorites } = useSelector(
        (rootReducer: RootState) => rootReducer.movieReducer
    );
    const [isFavoriteActive, setIsFavoriteActive] = useState(false);

    useEffect(() => {
        getMovies();
    }, []);

    console.log(favorites);

    const getMovies = async () => {
        try {
            const response = await fetch(
                `${API_SITE}/movie/popular?${API_KEY}&language=en-US&page=1`
            );
            const movieData = await response.json();

            if (response.ok) {
                dispatch(getMovieReducerSuccess(movieData.results));
            } else {
                dispatch(
                    getMovieReducerError(
                        "Ocorreu algum erro ao tentar buscar por filmes"
                    )
                );
            }

            return movieData;
        } catch (error) {
            dispatch(getMovieReducerError(error));
            return error;
        }
    };

    const handleFavoriteMovie = (movie: IMovie) => {
        dispatch(addMovieToFavorite(movie));
    };

    const handleDisplayOnlyFavorites = () => {
        if (favorites.length > 0) {
            setIsFavoriteActive(true);
            dispatch(filterOnlyFavorites());
        } else {
            alert(
                "Por favor, adicione um filme a lista de favoritos através do ícone de favoritar"
            );
        }
    };

    const handleDisplayAllMovies = () => {
        setIsFavoriteActive(false);
        getMovies();
    };

    const handleDeleteMovies = (movieId: number) => {
        dispatch(deleteMovieFromList(movieId));
    };

    return (
        <div className="page-container">
            <h1>Conheça Filmes populares</h1>
            <h2>Estes estão lotando as bilheterias</h2>

            {movies ? (
                <>
                    <div className="btn-filter-container">
                        <button
                            onClick={handleDisplayAllMovies}
                            className={isFavoriteActive ? "" : "active"}
                        >
                            Mostrar todos
                        </button>
                        <button
                            onClick={handleDisplayOnlyFavorites}
                            className={isFavoriteActive ? "active" : ""}
                        >
                            Filtar por favoritos
                        </button>
                    </div>

                    <div className="card-container">
                        {movies.map((movie: IMovie) => {
                            return (
                                <div className="card" key={movie.id}>
                                    <X
                                        size={24}
                                        color="#fef7f196"
                                        className="delete-icon"
                                        onClick={() =>
                                            handleDeleteMovies(movie.id)
                                        }
                                    />
                                    <div className="card-header">
                                        <img
                                            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                            alt=""
                                        />
                                    </div>

                                    <span
                                        data-movie-rate={
                                            movie.vote_average < 5.5
                                                ? "bad"
                                                : movie.vote_average > 5.5 &&
                                                  movie.vote_average < 8
                                                ? "medium"
                                                : "good"
                                        }
                                    >
                                        {movie.vote_average}
                                    </span>
                                    <h2>{movie.title}</h2>
                                    {/* <span>{movie.release_date}</span> */}
                                    <p>{movie.overview}</p>
                                    <Heart
                                        data-id={movie.id}
                                        className="favorite-icon"
                                        size={32}
                                        weight={
                                            favorites.some(
                                                (favoriteMovie: IMovie) =>
                                                    favoriteMovie.id ===
                                                    movie.id
                                            )
                                                ? "fill"
                                                : "regular"
                                        }
                                        color={
                                            favorites.some(
                                                (favoriteMovie: IMovie) =>
                                                    favoriteMovie.id ===
                                                    movie.id
                                            )
                                                ? "red"
                                                : "#fef7f1"
                                        }
                                        alt="favoritar filme"
                                        onClick={() =>
                                            handleFavoriteMovie(movie)
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <h2>{error}</h2>
            )}
        </div>
    );
}

export default App;
