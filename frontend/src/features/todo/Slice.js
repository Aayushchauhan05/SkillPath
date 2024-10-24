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
      console.log(action.payload)
      const user = action.payload;
      console.log("Setting current user:", user.uid,user.email);
      if (user) {
        
        state.currentuser = {
          uid: user.uid,
          providerId: user.providerId,
          ...user,
          email:user.email
        
        };
      } else {
        state.currentuser = null; 
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});


export const loadUser = () => (dispatch) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    console.log("Auth state changed:", user);
    dispatch(setCurrentUser(user));
  
    dispatch(setLoading(false));
  });
  return unsubscribe; 
};

export const { setCurrentUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
