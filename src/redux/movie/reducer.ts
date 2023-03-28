import MovieActionTypes from "./action-types";

const initialState = {
    currentMovies: null,
};

const movieReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case MovieActionTypes.GET:
            return { ...state, currentMovies: action.payload };
        default:
            return state;
    }
};

export default movieReducer;
