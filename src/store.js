import { configureStore } from "@reduxjs/toolkit";
import planReducer from "./features/plans/planSlice";

const store = configureStore({
  reducer: {
    plan: planReducer,
  },
});

export default store;
