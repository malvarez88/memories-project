import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import * as api from "../api";

export const authGoogle = createAsyncThunk(
  "AUTH",
  ({ name, picture, email }) => {
    // console.log("redux", name, picture, email);
    return { name, picture, email };
  }
);

export const logOut = createAsyncThunk("LOGOUT", (user) => {
  return user;
});

export const signUp = createAsyncThunk("SIGN_UP", async (formData) => {
  //   console.log("🚀 ~ file: auth.js ~ line 13 ~ signUp ~ formDatasdasdasdasdsa", formData); //ok
  try {
    const singup = await axios.post(
      "http://localhost:3001/user/signup",
      formData
    );
    // console.log("🚀 ~ file: auth.js ~ line 21 ~ signUp ~ singup", singup.data)

    return singup.data;
  } catch (error) {
    console.log(error);
  }
});

export const signIn = createAsyncThunk("SIGN_IN", async (formData, history) => {
  console.log("🚀 ~ file: auth.js ~ line 30 ~ signIn ~ formData", formData);
  try {
    const signin = await axios.post(
      "http://localhost:3001/user/signin",
      formData
    );
    return signin.data;
    //sign up the user
    // history.push('/');
  } catch (error) {
    console.log(error);
  }
});

const authReducer = createReducer(
  localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile"))
    : { authData: null },
  {
    [authGoogle.fulfilled]: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      return { ...state, authData: action.payload };
    },
    [logOut.fulfilled]: (state, action) => {
      localStorage.clear();
      return { authData: null };
    },
    [signUp.fulfilled]: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      return { ...state, authData: action.payload };
    },
    [signUp.rejected]: (state, action) => action.payload,
    [signIn.fulfilled]: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      return { ...state, authData: action.payload };
    },
  }
);

export default authReducer;
