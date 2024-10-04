"use client"; 
import { useAuth } from "@/context/context"; 
import { SignInWithFirebaseWithEmailAndPassword, signInWithGoogle } from "@/utils/firebaseAuth"; 
import { useRouter } from "next/navigation"; 
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa"; 

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { addToken } = useAuth();
  const router = useRouter(); 

  
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = async  (e) => {
    e.preventDefault();
const user = await SignInWithFirebaseWithEmailAndPassword({email:loginData.email,password:loginData.password})
if (user && user._tokenResponse) {
  console.log("Token Response:", user._tokenResponse);
  console.log("Access Token:", user._tokenResponse.idToken); 
  addToken(user._tokenResponse.idToken); 
  router.push("/"); 
} else {
  console.error("User or token response is undefined:", user);
}
console.log(user)
    console.log("Login Submitted", loginData);
   
  };

  
  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("User object:", user);

      
      if (user && user._tokenResponse) {
        console.log("Token Response:", user._tokenResponse);
        console.log("Access Token:", user._tokenResponse.idToken); 
        addToken(user._tokenResponse.idToken); 
        router.push("/"); 
      } else {
        console.error("User or token response is undefined:", user);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-md"
      >
        <h2 className="mb-6 text-3xl font-bold text-center text-blue-600">Login</h2>

        {/* Email input */}
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password input */}
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
            required
          />
        </div>

        {/* Login button for email/password */}
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>

        {/* Button for Google login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full px-4 py-2 mt-4 font-bold text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-600"
        >
          <FaGoogle className="mr-2" /> {/* Google icon */}
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
