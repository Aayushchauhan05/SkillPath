import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [], 
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const message = action.payload;
      if (message) {
        state.messages.push(message); 
      }
    },
    clearMessages: (state) => {
      state.messages = []; 
    },
  },
});

export const { addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
