"use client"
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/features/todo/Slice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
