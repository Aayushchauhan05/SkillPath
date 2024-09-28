import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addToken: (state, action) => {
            localStorage.setItem("token", action.payload);
            state.token = action.payload;
        },
        getToken: (state) => {
            const token = localStorage.getItem("token");
            state.token = token || "";
        },
        removeToken: (state) => {
            localStorage.removeItem("token");
            state.token = "";
        },
    },
});

export const { addToken, getToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
