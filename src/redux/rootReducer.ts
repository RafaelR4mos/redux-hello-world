import { combineReducers } from "redux";
import movieReducer from "./movie/slice";

const rootReducer = combineReducers({ movieReducer });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
