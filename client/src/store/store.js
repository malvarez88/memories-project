import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import postsReducer from "./posts";

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  reducer: {
    posts: postsReducer,
  },
});
export default store;
