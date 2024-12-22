'use client'

import { useCallback, useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Trophy } from 'lucide-react'
import AxiosInstance from "@/lib/AxiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "@/features/todo/Slice";
import MenteeSideBar from "@/app/component/MenteeSideBar";
import Link from "next/link"
export default function QuizDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const unsubscribe = dispatch(loadUser());
    return () => unsubscribe();
  }, [dispatch]);

  const userId = useSelector((state) => state.auth.currentuser?.uid);

  const fetchData = useCallback(async () => {
    try {
      if (!userId) {
        console.log("User ID not found");
        return;
      }

      const response = await AxiosInstance.get(`/quiz/quizs/mentee/${userId}`);
      setQuizzes(response?.data || []);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const completedQuizzes = quizzes.filter(quiz => quiz.status === 'completed');
  const pendingQuizzes = quizzes.filter(quiz => quiz.status === 'pending');
  const totalScore = completedQuizzes.reduce((sum, quiz) => sum + Number(quiz.score || 0), 0);
  const totalQuestions = completedQuizzes.reduce((sum, quiz) => sum + (quiz.questions?.length || 0), 0);
  const averageScore = totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;

  return (
    <div className="container h-screen px-4 py-8 mx-auto">
      <MenteeSideBar />
      <h1 className="mb-8 text-3xl font-bold text-center">Quiz Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Quizzes Taken
            </CardTitle>
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedQuizzes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Average Score
            </CardTitle>
            <Trophy className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore.toFixed(1)}%</div>
            <Progress value={averageScore} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Pending Quizzes
            </CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingQuizzes.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Completed Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedQuizzes.map(quiz => (
                <div key={quiz._id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{quiz.domain}</h3>
                    <p className="text-sm text-muted-foreground">Score: {quiz.score} / {quiz.questions?.length || 0}</p>
                  </div>
                  <Badge variant="secondary">Completed</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingQuizzes.map(quiz => (
                <div key={quiz._id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{quiz.domain}</h3>
                    <p className="text-sm text-muted-foreground">{quiz.questions?.length || 0} questions</p>
                  </div>
                  <Link href={`/mentee/dashboard/quiz/${quiz._id}`} variant="outline" size="sm">Start Quiz</Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
