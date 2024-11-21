"use client";

import AxiosInstance from "@/lib/AxiosInstance";
import { auth, db } from "@/utils/firebase";
import { createUserFireBase } from "@/utils/firebaseAuth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import Link from "next/link";

toast.configure();

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "mentee",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await createUserFireBase({
        email: formData.email,
        password: formData.password,
      });

      const user = auth.currentUser;
      if (user) {
        await user.sendEmailVerification();
        toast.info("Verification email sent. Please verify your email.");

        await setDoc(doc(db, "user", user.uid), {
          ...formData,
          password: "",
          confirmPassword: "",
        });

        await AxiosInstance.post("/Auth/register_user", {
          _id: user.uid,
          ...formData,
          password: "",
          confirmPassword: "",
        });

        const isVerified = await waitForEmailVerification(user);
        if (!isVerified) {
          throw new Error("Email verification failed.");
        }

        toast.success("Registration successful!");
        router.push("/login");
      }
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);

      const user = auth.currentUser;
      if (user) {
        await user.delete();
        toast.info("User registration rolled back.");
      }
    }
  };

  const waitForEmailVerification = (user) => {
    return new Promise((resolve) => {
      const interval = setInterval(async () => {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(interval);
          resolve(true);
        }
      }, 3000);

      setTimeout(() => {
        clearInterval(interval);
        resolve(false);
      }, 300000);
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
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
                  setFormData({ ...formData, role: value })
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
          </form>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/")}
            className="text-gray-300 border-gray-700 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="text-gray-100 bg-indigo-600 hover:bg-indigo-700"
          >
            Register
          </Button>
        </CardFooter>
        <p>
          Already have a account?{" "}
          <Link href={"/login"} className="text-red-400">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default RegistrationForm;
