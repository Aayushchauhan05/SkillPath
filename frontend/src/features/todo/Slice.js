"use client";

import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../utils/firebase"; 
import { onAuthStateChanged } from "firebase/auth";

const initialState = {
  currentuser: null,
  loading: true,
};

// const msgState={
//   message:null
// }
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      const { uid, email, providerId } = action.payload || {};
      if (action.payload) {
        state.currentuser = { uid, email, providerId };
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
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        providerId: user.providerId,
      };
      dispatch(setCurrentUser(userData));
    } else {
      dispatch(setCurrentUser(null));
    }
    dispatch(setLoading(false));
  });
  return unsubscribe; 
};

export const { setCurrentUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
