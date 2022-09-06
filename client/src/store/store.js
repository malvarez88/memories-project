import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import postsReducer from "./posts";
import authReducer from './auth'

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  reducer: {
    posts: postsReducer,
    auth: authReducer
  },
});
export default store;
