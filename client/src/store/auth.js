import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const authGoogle = createAsyncThunk("AUTH", () => {

})


const authReducer = createReducer([], {
    [authGoogle.fullWidth] : (state, action) => action.payload,
});



export default authReducer;