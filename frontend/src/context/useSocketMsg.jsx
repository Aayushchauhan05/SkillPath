"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useChat } from "./chatContext";
import { addMessage } from "@/features/todo/chatSlice";

function useSocketMsg() {
  const dispatch = useDispatch();
  const { socket } = useChat();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      dispatch(addMessage(newMessage));
    };

    socket.on("newmessage", handleNewMessage);

    return () => {
      socket.off("newmessage", handleNewMessage);
    };
  }, [socket, dispatch]);
}

export default useSocketMsg;
