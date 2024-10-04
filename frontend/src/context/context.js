"use client";

import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState("");

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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
