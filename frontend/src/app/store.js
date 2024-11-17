"use client"
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/features/todo/Slice"
import chatSlice from "@/features/todo/chatSlice"
export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat:chatSlice
  },
});
