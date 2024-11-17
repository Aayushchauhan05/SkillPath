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
  const [code,setCode]=useState("")
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
  const addCode=(code)=>{
    localStorage.setItem("code",code);
  }
  const removeCode=()=>{
    localStorage.removeItem("code");
      setCode("");
  }
  const getCode=()=>{
    setCode(localStorage.getItem("code"));
  }

  const value = {
    token,
    addToken,
    removeToken,
    code,setCode,addCode,getCode,removeCode
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
