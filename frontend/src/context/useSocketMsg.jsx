"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useChat } from "./chatContext";
import { addMessage } from "@/features/todo/chatSlice";

const NEW_MESSAGE_EVENT = "newmessage";

function useSocketMsg() {
  const dispatch = useDispatch();
  const { socket } = useChat();

  useEffect(() => {
    if (!socket) {
      console.error("Socket is not initialized.");
      return;
    }

    const handleNewMessage = (newMessage) => {
      console.log("Received new message:", newMessage);
      dispatch(addMessage(newMessage));
    };

    socket.on(NEW_MESSAGE_EVENT, handleNewMessage);

    return () => {
      console.log("Removing socket listeners for:", NEW_MESSAGE_EVENT);
      socket.off(NEW_MESSAGE_EVENT, handleNewMessage);
    };
  }, [socket, dispatch]);
}

export default useSocketMsg;
