import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { user } from "store/user";

const rootReducer = combineReducers({
  user: user.reducer, // createReducer로 만든 리듀서 객체
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
