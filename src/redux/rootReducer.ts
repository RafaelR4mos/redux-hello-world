import { combineReducers } from "redux";
import movieReducer from "./movie/slice";

const rootReducer = combineReducers({ movieReducer });

export default rootReducer;
