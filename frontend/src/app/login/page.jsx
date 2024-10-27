"use client"; 
import { useAuth } from "@/context/context"; 
import { loadUser } from "@/features/todo/Slice";
import { SignInWithFirebaseWithEmailAndPassword, signInWithGoogle } from "@/utils/firebaseAuth"; 
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation"; 
import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa"; 
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { db } from "@/utils/firebase";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
const userId=useSelector(state=>state.currentuser?.uid)
  const { addToken } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const getUser = async (user) => {
    const userCollection = collection(db, "user");
    const userQuery = query(userCollection, where("email", "==", user.email));

    const querySnapshot = await getDocs(userQuery);
    console.log("data>>>>",querySnapshot.docs[0].data())

    if (querySnapshot.empty) {
      throw new Error("User not found");
    }

    const userData = querySnapshot.docs[0].data();
    console.log("userdata",userData);
    Cookies.set("role",userData.role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const user = await SignInWithFirebaseWithEmailAndPassword({
        email: loginData.email,
        password: loginData.password,
      });
      console.log(user)

      if (user && user._tokenResponse) {
        addToken(user._tokenResponse.idToken);
        Cookies.set("token", user._tokenResponse.idToken, { expires: 7 });
        await getUser (user.user)
       Cookies.set("user", user.user.uid);
        router.push("/");
      } else {
        console.error("User or token response is undefined:", user);
      }
    } catch (error) {
      console.error("Error during sign-in:", error); // Added error handling
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("User object:", user);

      if (user && user._tokenResponse) {
        addToken(user._tokenResponse.idToken);
        dispatch(loadUser());
        Cookies.set("token", user._tokenResponse.idToken, { expires: 7 });
        await getUser (user.user)
        Cookies.set("user",user.user.uid);
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
