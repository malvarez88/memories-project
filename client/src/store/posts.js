import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getPost = createAsyncThunk("GET_POSTS", async () => {
  const data = await api.fetchPost();
  return data;
});

export const createPost = createAsyncThunk("CREATE_POST", (post) => {
  return api.createPost(post);
});

export const updatePost = createAsyncThunk("UPDATE_POST", (id, post) => {
  return api.updatePost(id, post);
  //check the post, its not arriving ok!!
});

export const deletePost = createAsyncThunk("DELETE_POST", (id) => {
  return api.deletePost(id);
});

export const likePost = createAsyncThunk("LIKE_POST", (id) => {
  return api.likePost(id);
});


const postsReducer = createReducer([], {
  [getPost.fulfilled]: (state, action) => action.payload,
  [createPost.fulfilled]: (state, action) => [...state, action.payload],
  [updatePost.fulfilled]: (state, action) => {
    state.map((post) =>
      post._id === action.payload._id ? action.payload : state
    );
  },
  [deletePost.fulfilled]: (state, action) => {
    state.filter((post) => post._id !== action.payload);
  },
  [likePost.fulfilled]: (state, action) => {
    state.map((post) =>
      post._id === action.payload._id ? action.payload : state
    );
  },
});

export default postsReducer;
