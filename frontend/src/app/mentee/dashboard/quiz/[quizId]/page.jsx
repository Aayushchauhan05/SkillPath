"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import MenteeSideBar from "@/app/component/MenteeSideBar";
import AxiosInstance from "@/lib/AxiosInstance";

export default function Page() {
  const { quizId } = useParams(); 
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await AxiosInstance.get(`/quiz/${quizId}`);
        setQuizData(response.data);
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
      }
    };

    if (!quizId) {
      console.log("id not found");
      return;
      
    }
    fetchQuizData();
  }, [quizId]);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prevSelected) => ({
      ...prevSelected,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    let updatedScore = 0;


    quizData.questions.forEach((question) => {
      const selectedAnswer = selectedAnswers[question._id];
      const correctAnswer = question.answer.find((ans) => ans.correct);
      if (selectedAnswer === correctAnswer?.Solution) {
        updatedScore += 1;
      }
    });

    setScore(updatedScore);
    setIsFinished(true);

    try {
      if(!quizId){
        alert("something went wrong");
        return;
      }
     
      await AxiosInstance.put(`/quiz/updatequiz/${quizId}`, {
        status: "completed",
        score: updatedScore,
      });
      console.log("Quiz updated successfully");
    } catch (error) {
      console.error("Failed to update quiz:", error);
    }
  };

  const progress = isFinished
    ? 100
    : quizData
    ? (Object.keys(selectedAnswers).length / quizData.questions.length) * 100
    : 0;

  return (
    <div className="flex items-center justify-center min-h-screen p-4 ">
      <MenteeSideBar />
      <Card className="w-full max-w-4xl">
        {quizData ? (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Quiz by {quizData.mentorId.username}
              </CardTitle>
              <p className="text-gray-500">Domain: {quizData.domain}</p>
            </CardHeader>
            {!isFinished ? (
              <>
                <CardContent className="space-y-6">
                  <Progress value={progress} className="w-full" />
                  {quizData.questions.map((question) => (
                    <div key={question._id} className="space-y-4">
                      <p className="text-lg font-semibold">{question.question}</p>
                      <div className="space-y-2">
                        {question.answer.map((option) => (
                          <div
                            key={option._id}
                            className="flex items-center p-2 space-x-2 transition-colors rounded-lg hover:bg-gray-100"
                          >
                            <input
                              type="radio"
                              id={`${question._id}-${option._id}`}
                              name={`question-${question._id}`}
                              onChange={() => handleAnswerSelect(question._id, option.Solution)}
                              checked={selectedAnswers[question._id] === option.Solution}
                            />
                            <Label
                              htmlFor={`${question._id}-${option._id}`}
                              className="flex-grow text-base cursor-pointer"
                            >
                              {option.Solution}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      Object.keys(selectedAnswers).length !== quizData.questions.length
                    }
                    className="w-full py-6 text-lg"
                  >
                    Submit Quiz
                  </Button>
                </CardFooter>
              </>
            ) : (
              <CardContent>
                <p className="text-lg font-semibold">Quiz Completed!</p>
                <p className="text-lg">Your score: {score}</p>
              </CardContent>
            )}
          </>
        ) : (
          <CardContent>
            <p className="text-lg text-gray-500">Loading quiz...</p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
