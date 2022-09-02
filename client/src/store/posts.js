import {
  createReducer,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import * as api from "../api";

export const getPost = createAsyncThunk("GET_POSTS", async () => {
  const data = await api.fetchPost();
  return data;
});

export const createPost = createAsyncThunk("CREATE_POST", (post) => {
  return api.createPost(post);
});

export const updatePost = createAsyncThunk("UPDATE_POST", async (id, post) => {
    console.log(post,id)
  const uPost = await api.updatePost(id, post);
  return uPost;
});

const postsReducer = createReducer([], {
  [getPost.fulfilled]: (state, action) => action.payload,
  [createPost.fulfilled]: (state, action) => [...state, action.payload],
  [updatePost.fulfilled]: (state, action) => {
    state.map((post) =>
      post._id === action.payload._id ? action.payload : state
    );
  },
});

export default postsReducer;
