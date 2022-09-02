import { createAction, createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api';

export const getPost = createAsyncThunk('GET_POSTS', async () => {
    const data = await api.fetchPost();
    return data
})

export const createPost = createAsyncThunk('CREATE_POST', (post) => {
    return api.createPost(post);
})

const postsReducer = createReducer([],{
    [getPost.fulfilled] : (state, action) => action.payload,
    [createPost.fulfilled] : (state, action) => [...state, action.payload]
})

export default postsReducer;