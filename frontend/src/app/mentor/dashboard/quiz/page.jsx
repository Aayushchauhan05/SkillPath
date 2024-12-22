"use client"

import React, { useEffect, useState,useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AxiosInstance from "@/lib/AxiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "@/features/todo/Slice";
import QuizForm from "@/app/component/QuizForm";
import Link from "next/link"
import SideBar from "@/app/component/MentorSideBar"

const mockQuizzes = [
  { id: '1', title: 'JavaScript Basics', participants: 150, averageScore: 78 },
  { id: '2', title: 'React Fundamentals', participants: 120, averageScore: 82 },
  { id: '3', title: 'CSS Flexbox', participants: 90, averageScore: 75 },
  { id: '4', title: 'Python for Beginners', participants: 200, averageScore: 80 },
];


function Header() {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">Quiz Dashboard</h1>
      <QuizForm/>
    </div>
  );
}

function QuizCard({ quiz }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{quiz?.questions?.question}</CardTitle>
      </CardHeader>
      <CardContent>
     <p>Doman :{quiz?.domain}</p> 
        <p>Participants: {quiz?.menteeId?.email}</p>
        <p>Total Question: {quiz?.questions?.length}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/mentor/dashboard/quiz/${quiz?._id}`} variant="outline">View Details</Link>
      </CardFooter>
    </Card>
  );
}


export default function QuizDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = dispatch(loadUser());
    return () => unsubscribe();
  }, [dispatch]);
  const userId = useSelector((state) => state.auth.currentuser?.uid);
  const fetchData= useCallback(async ()=>{
    console.log("userId>>>>>>",userId);
   
try {
  if (!userId) {
    console.log("user id not found");
    return;
  }
        const response = await AxiosInstance.get(`/quiz/quizs/mentor/${userId}`)
        console.log(response.data);
    
        setQuizzes(response.data)
} catch (error) {
    console.log(error);
}
  },[userId]) 
  useEffect(()=>{
fetchData()
  },userId)
  return (
    <div className="container h-[100vh] p-4 mx-auto">
    <SideBar/>
      <Header />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
      
    </div>
  );
}
