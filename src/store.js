import { combineReducers, createStore } from "redux";
import reducer from "./features/plans/planSlice";

const rootReducer = combineReducers({ plan: reducer });

export const store = createStore(rootReducer);
