"use client";

import { io } from "socket.io-client";
import { useAuth } from "./context";
import { useSelector } from "react-redux";
import { createContext, useEffect, useContext, useRef, useState } from "react";

export const chatContext = createContext();

export const ChatProvider = ({ children }) => {
  const socketRef = useRef(null);
  const userId = useSelector((state) => state.auth.currentuser?.uid);
  const { token } = useAuth();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const cleanup = () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      }
    };

    if (token && userId && userId !== "undefined" && !socketRef.current) {
      socketRef.current = io(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
        query: { userId },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socketRef.current.on("connect", () => {
        console.log("Socket connected");
        setIsConnected(true);
      });

      socketRef.current.on("disconnect", () => {
        console.log("Socket disconnected");
        setIsConnected(false);
      });

      socketRef.current.on("connect_error", (error) => {
        console.error("Connection error:", error);
        cleanup();
      });
    }

    return cleanup;
  }, [token, userId]);

  
  return (
    <chatContext.Provider 
      value={{ 
        socket: socketRef.current,
        isConnected 
      }}
    >
      {children}
    </chatContext.Provider>
  );
};


export const useChat = () => {
  const context = useContext(chatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};