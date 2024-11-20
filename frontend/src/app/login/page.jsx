"use client";
import { useAuth } from "@/context/context";
import { loadUser } from "@/features/todo/Slice";
import { SignInWithFirebaseWithEmailAndPassword, signInWithGoogle } from "@/utils/firebaseAuth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { db } from "@/utils/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import AxiosInstance from "@/lib/AxiosInstance";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.currentuser?.uid);
  const { addToken, addCode } = useAuth();
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

    if (querySnapshot.empty) {
      throw new Error("User not found");
    }

    const userData = querySnapshot.docs[0].data();
    Cookies.set("role", userData.role); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await SignInWithFirebaseWithEmailAndPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (user && user._tokenResponse) {
        addToken(user._tokenResponse.idToken);
        Cookies.set("token", user._tokenResponse.idToken, { expires: 7 });
        await getUser(user.user);
        Cookies.set("user", user.user.uid);
        router.push("/");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await signInWithGoogle();

      if (user && user._tokenResponse) {
        addToken(user._tokenResponse.idToken);
        dispatch(loadUser());
        Cookies.set("token", user._tokenResponse.idToken, { expires: 7 });
        await getUser(user.user);
        Cookies.set("user", user.user.uid);
        router.push("/");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <Card className="w-full max-w-md p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-center text-gray-100">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="text-gray-100 placeholder-gray-500 bg-gray-700 focus:ring-gray-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="********"
                className="text-gray-100 placeholder-gray-500 bg-gray-700 focus:ring-gray-500"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full text-gray-100 bg-gray-600 hover:bg-gray-500"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full mt-2 space-x-2 text-gray-100 bg-red-500 hover:bg-red-600"
              disabled={loading}
            >
              <FaGoogle />
              <span>{loading ? "Loading..." : "Login with Google"}</span>
            </Button>
          </form>
        </CardContent>
        <p>Do not have a account? <Link href={"/registration"} className="text-red-400">Registration</Link></p>
      </Card>
    </div>
  );
};

export default LoginForm;
