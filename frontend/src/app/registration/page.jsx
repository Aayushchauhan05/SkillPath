"use client"
import AxiosInstance from '@/lib/AxiosInstance';
import { auth, db } from '@/utils/firebase';
import { createUserFireBase } from '@/utils/firebaseAuth';
import { doc, setDoc } from 'firebase/firestore';
import { redirect, useRouter} from 'next/navigation';
import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role:''
  });
const router=useRouter()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await createUserFireBase({email:formData.email,password:formData.password});
   const user= auth.currentUser;
   if (user) {
    await setDoc(doc(db,"user",user.uid),{
      ...formData,
      password:"",
      confirmPassword:""
     
    })
    await AxiosInstance.post("/Auth/register_user",{
      _id:user.uid,
      ...formData,
      password:"",
      confirmPassword:""
    })
   }
router.push("/login")
    }
    catch(e){
      await auth.currentUser.delete();

    }
  
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded shadow-md"
      >
        <h2 className="mb-6 text-2xl font-bold text-center">Register</h2>

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Role:</label>
         <select name="role" id="role" defaultValue={"mentee"}
            onChange={handleChange}><option value="mentor">mentor</option><option value="mentee">mentee</option></select>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
