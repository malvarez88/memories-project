import { createAction, createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api';

export const getPost = createAsyncThunk('GET_POSTS', () => {
    return api.fetchPost();
})

const postsReducer = createReducer([],{
    [getPost.fulfilled] : (state, action) => action.payload,
})

export default postsReducer;