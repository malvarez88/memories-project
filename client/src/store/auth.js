import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const authGoogle = createAsyncThunk("AUTH", ({result, token}) => {
    return {result, token};
});

export const logOut = createAsyncThunk("LOGOUT", (user) => {
    return user;
});

export const signIn = createAsyncThunk("SIGN_IN", (formData, history) => {
    try {
        //sign in the user
        history.push('/');
    } catch (error) {
        console.log(error);
    }

});

export const signUp = createAsyncThunk("SIGN_UP", (formData, history) => {
    try {
        //sign up the user
        history.push('/');
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
});



export default authReducer;