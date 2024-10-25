"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";

export const AuthContext = createContext();
import { loadUser } from "@/features/todo/Slice";
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState("");
 const dispatch=useDispatch()
  useEffect(() => {
    const storedToken =  localStorage.getItem("token") || "";
    setToken(storedToken);
  }, []);

  const addToken = (newToken) => {
  
      localStorage.setItem("token", newToken);
      setToken(newToken);
    
  };

  const removeToken = () => {
   
      localStorage.removeItem("token");
      setToken("");
    
  };

  const value = {
    token,
    addToken,
    removeToken,
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
