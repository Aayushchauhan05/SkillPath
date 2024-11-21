"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

import { auth, db } from "@/utils/firebase";
import AxiosInstance from "@/lib/AxiosInstance";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "mentee",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
     
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      const user = userCredential.user;

      
      await sendEmailVerification(user);
      toast.info("Verification email sent. Please check your inbox.");

     
      await setDoc(doc(db, "user", user.uid), {
        username: formData.username,
        email: formData.email,
        role: formData.role,
        createdAt: new Date()
      });

     
      const verified = await waitForEmailVerification(user);
      if (!verified) {
        throw new Error("Email verification timeout");
      }

     try{
      await AxiosInstance.post("/Auth/register_user", {
        _id: user.uid,
        username: formData.username,
        email: formData.email,
        role: formData.role
      });
     }catch(erro){
      toast.error("username or email already exist ");
     }
     

      toast.success("Registration successful!");
      router.push("/login");
      setIsLoading(false);
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
      
      
      if (auth.currentUser) {
        await auth.currentUser.delete();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const waitForEmailVerification = (user) => {
    return new Promise((resolve) => {
      let attempts = 0;
      const maxAttempts = 20; 

      const verificationInterval = setInterval(async () => {
        await user.reload();
        attempts++;

        if (user.emailVerified) {
          clearInterval(verificationInterval);
          resolve(true);
        }

        if (attempts >= maxAttempts) {
          clearInterval(verificationInterval);
          resolve(false);
        }
      }, 15000); // Check every 15 seconds
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Card className="w-full max-w-md p-6 bg-gray-900 border border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-100">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-gray-400">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="text-gray-300 bg-gray-800 border-gray-700"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-gray-400">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="text-gray-300 bg-gray-800 border-gray-700"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-gray-400">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="text-gray-300 bg-gray-800 border-gray-700"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-gray-400">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="text-gray-300 bg-gray-800 border-gray-700"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="role" className="text-gray-400">
                Role
              </Label>
              <Select
                name="role"
                value={formData.role}
                onValueChange={(value) =>
                  setFormData(prev => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger className="text-gray-300 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent className="text-gray-300 bg-gray-800 border-gray-700">
                  <SelectItem value="mentor">Mentor</SelectItem>
                  <SelectItem value="mentee">Mentee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full text-gray-100 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-red-400 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default RegistrationForm;