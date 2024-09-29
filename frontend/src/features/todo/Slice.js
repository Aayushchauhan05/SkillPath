"use client";

import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../utils/firebase"; 
import { onAuthStateChanged } from "firebase/auth";

const initialState = {
  currentuser: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentuser = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});


export const loadUser = () => (dispatch) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    dispatch(setCurrentUser(user));
    dispatch(setLoading(false));
  });
  return unsubscribe; 
};

export const { setCurrentUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
