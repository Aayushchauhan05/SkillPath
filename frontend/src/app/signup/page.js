"use client"
import { useState } from 'react';
import { useFirebase } from '@/context/firebase';
import { firebaseApp, firebaseAuth, database } from "@/context/firebase";

import Image from 'next/image';

export default function SignUp() {

    const firebase = useFirebase();
    const [email,setEmail] = useState('');
    const[password,setPassword] = useState('');



    console.log("Firebase",firebase);


  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 relative">
      
      <div className="bg-white p-10 rounded-lg shadow-lg z-10 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>

        <form>
         

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
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
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input onChange={e=>setPassword(e.target.value)} value={password}
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>


          <button onSubmit={()=>firebase.signupUserWithEmailAndPassword(email,password)} 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
