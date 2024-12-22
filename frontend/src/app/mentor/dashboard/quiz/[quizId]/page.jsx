"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdAccountCircle, MdQuiz, MdInfo } from "react-icons/md";
import SideBar from "@/app/component/MentorSideBar";
import AxiosInstance from "@/lib/AxiosInstance";

export function TabsDemo() {
  const [data, setData] = useState(null);
  const router = useRouter();
  const { quizId } = useParams();

  useEffect(() => {
    
      const fetchQuizData = async () => {
        try {

          const response = await AxiosInstance.get(`/quiz/quiz/${quizId}`);
          setData(response.data);
        } catch (error) {
          console.error("Failed to fetch quiz data:", error);
        }
      };
      if(!quizId){
alert("Something went wrong")
return ;
      }
      fetchQuizData();
    
  }, [quizId]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen pl-10">
    <SideBar/>
      <h1 className="mb-10 text-7xl">Quiz Detail</h1>
      <Tabs defaultValue="quiz" className="w-[80vw] h-[70vh]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quiz" className="flex items-center gap-2 w-[30vw]">
            <MdQuiz />
            Quiz Details
          </TabsTrigger>
          <TabsTrigger value="domain" className="flex items-center gap-2 w-[30vw]">
            <MdInfo />
            Domain & IDs
          </TabsTrigger>
        </TabsList>

        {/* Quiz Tab */}
        <TabsContent value="quiz">
          <Card>
            <CardHeader className="flex items-center gap-2">
              <MdQuiz />
              <div>
                <CardTitle>Quiz Details</CardTitle>
                <CardDescription>Overview of the quiz data.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                {/* <strong>Quiz Topic:</strong> {data?.questions?.length > 0 ? "Available" : "No questions found"} */}
              </p>
              <p>
                <strong>Total Questions:</strong> {data?.questions.length || 0}
              </p>
              <div>
                {data?.questions.map((question, qIndex) => (
                  <div key={question._id} className="mb-4">
                    <p>
                      <strong>Question {qIndex + 1}:</strong> {question?.question || "N/A"}
                    </p>
                    <ul className="pl-5 list-disc">
                      {question?.answer.map((ans, index) => (
                        <li key={ans._id}>
                          {index + 1}. {ans?.Solution} (Correct: {ans.correct ? "Yes" : "No"})
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Domain and IDs Tab */}
        <TabsContent value="domain">
          <Card>
            <CardHeader className="flex items-center gap-2">
              <MdInfo />
              <div>
                <CardTitle>Domain & IDs</CardTitle>
                <CardDescription>
                  Details of the domain, mentor, mentee, and score.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Domain:</strong> {data?.domain || "N/A"}
              </p>
              <p>
                <strong>Mentor Email ID:</strong> {data?.mentorId?.email || "N/A"}
              </p>
              <p>
                <strong>Mentee Email ID:</strong> {data?.menteeId?.email || "N/A"}
              </p>
              <p>
                <strong>Score:</strong> {data?.score || "N/A"}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function TabsData() {
  return (
    <>
      <SideBar />
      <TabsDemo />
    </>
  );
}
