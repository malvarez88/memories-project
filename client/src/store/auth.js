import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const authGoogle = createAsyncThunk("AUTH", ({result, token}) => {
    return {result, token};
});

export const logOut = createAsyncThunk("LOGOUT", (user) => {
    return user;
});

export const signUp = createAsyncThunk("SIGN_UP", (formData, history) => {
    console.log("🚀 ~ file: auth.js ~ line 13 ~ signIn ~ formData", formData)
    try {
        return api.signup({formData});
        // history.push('/');
    } catch (error) {
        console.log(error);
    }

});

export const signIn = createAsyncThunk("SIGN_IN", (formData, history) => {
    try {
        //sign up the user
        // history.push('/');
    } catch (error) {
        console.log(error);
    }
});


const authReducer = createReducer({authData: null}, {
    [authGoogle.fulfilled] : (state, action) => {
        localStorage.setItem('profile', JSON.stringify({...action.payload}))
        return {...state, authData: action.payload};
    },
    [logOut.fulfilled] : (state, action) => {
        localStorage.clear();
        return {...state, authData: null};
    },
    [signUp.fulfilled] : (state, action) => {
        localStorage.setItem('profile', JSON.stringify({...action.payload}))
        return {...state, authData: action.payload};
    },
    [signUp.rejected] : (state, action) => action.payload,
});



export default authReducer;