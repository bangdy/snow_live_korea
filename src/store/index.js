import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { user } from "store/user";
import { resorts } from "store/resorts";

const rootReducer = combineReducers({
  user: user.reducer, // createReducer로 만든 리듀서 객체
  resorts: resorts.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
