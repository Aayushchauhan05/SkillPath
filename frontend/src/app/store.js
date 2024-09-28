"use client"
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/todo/Slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
