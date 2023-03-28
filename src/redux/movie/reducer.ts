import MovieActionTypes from "./action-types";

const initialState = {
    currentMovies: null,
};

const movieReducer = (state = initialState, action: any) => {
    if (action.type === MovieActionTypes.GET) {
        return { ...state, currentMovies: action.payload };
    }

    return state;
};

export default movieReducer;
