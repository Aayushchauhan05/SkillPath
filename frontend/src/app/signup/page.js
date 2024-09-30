"use client"
import { useState } from 'react';
import { useFirebase } from '@/context/firebase';
import { firebaseApp, firebaseAuth, database } from "@/context/firebase";

import Image from 'next/image';

export default function SignUp() {

    const {signupUserWithEmailAndPassword} = useFirebase();
    const [email,setEmail] = useState('');
    const[password,setPassword] = useState('');




const handleSubmit= async (e)=>{
e.preventDefault();
const user=await signupUserWithEmailAndPassword(email,password);
console.log(user)
}
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-blue-500">
      
      <div className="z-10 w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">Sign Up</h2>

        <form onSubmit={handleSubmit}>
         

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <input onChange={e=>setEmail(e.target.value)} value={email}
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
              Password
            </label>
            <input onChange={e=>setPassword(e.target.value)} value={password}
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>


          <button
            type="submit"
            className="w-full px-4 py-2 text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
