import { createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../../utils/interface";

interface IinitialState {
    movies: IMovie[] | [];
    error: null | string;
    favorites: IMovie[] | [];
}

const initialState: IinitialState = {
    movies: [],
    error: null,
    favorites: [],
};

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        getMovieReducerSuccess: (state, action) => {
            state.movies = action.payload;
        },
        getMovieReducerError: (state, action) => {
            state.error = action.payload;
        },
        addMovieToFavorite: (state, action) => {
            const isAlreadyInFavorite = state.favorites.some(
                (favorites) => favorites.id === action.payload.id
            );

            if (isAlreadyInFavorite) {
                state.favorites = state.favorites.filter(
                    (favoriteMovite) => favoriteMovite.id !== action.payload.id
                );
            } else {
                state.favorites = [...state.favorites, { ...action.payload }];
            }
        },
        deleteMovieFromList: (state, action) => {
            state.movies = state.movies.filter(
                (movie) => movie.id !== action.payload
            );
        },

        filterOnlyFavorites: (state) => {
            state.movies = state.favorites;
        },
    },
});

export const {
    getMovieReducerSuccess,
    getMovieReducerError,
    addMovieToFavorite,
    filterOnlyFavorites,
    deleteMovieFromList,
} = movieSlice.actions;

export default movieSlice.reducer;
