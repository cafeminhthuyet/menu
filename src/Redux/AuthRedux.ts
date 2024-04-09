import {createSlice} from "@reduxjs/toolkit";
import Item from "../Models/Item";
import {User} from "firebase/auth";
import {AuthState} from "../Models/AuthState";


const slice = createSlice({
  name: 'auth',
  initialState: { isLogin: false } as AuthState,
  reducers: {
    setAuth:  (state, action: { payload: AuthState }) => state = action.payload,
  },
})

export const { setAuth } = slice.actions;

export default slice.reducer;
