"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: typeof window !== 'undefined' ? localStorage.getItem("token") : "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state, action) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem("token", action.payload);
      }
      state.token = action.payload;
    },
    removeToken: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem("token");
      }
      state.token = "";
    },
  },
});

export const { addToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
