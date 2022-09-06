import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const authGoogle = createAsyncThunk("AUTH", ({result, token}) => {
    return {result, token};
});

export const logOut = createAsyncThunk("LOGOUT", (user) => {
    console.log("🚀 ~ file: auth.js ~ line 9 ~ logOut ~ user", user)
    return user;
})


const authReducer = createReducer({authData: null}, {
    [authGoogle.fulfilled] : (state, action) => {
        localStorage.setItem('profile', JSON.stringify({...action.payload}))
        return {...state, authData: action.payload};
    },
    [logOut.fulfilled] : (state, action) => {
        localStorage.clear();
        return {...state, authData: null};
    }
});



export default authReducer;