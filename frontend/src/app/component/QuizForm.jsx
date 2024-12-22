"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "@/features/todo/Slice";

export default function QuizForm() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = dispatch(loadUser());
    return () => unsubscribe();
  }, [dispatch]);

  const mentorId = useSelector((state) => state.auth.currentuser?.uid);
  const [quizData, setQuizData] = useState({
    mentorId: mentorId,
    menteeId: "",
    questions: [
      {
        question: "",
        answer: [{ Solution: "", correct: false }],
      },
    ],
    domain: "",
    score: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (name, value) => {
    setQuizData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index].question = value;
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleAnswerChange = (questionIndex, answerIndex, field, value) => {
    const updatedQuestions = [...quizData.questions];
    const updatedAnswers = [...updatedQuestions[questionIndex].answer];
    if (field === "correct") {
      updatedAnswers[answerIndex][field] = value === "true"; // Convert the string 'true'/'false' to a boolean
    } else {
      updatedAnswers[answerIndex][field] = value;
    }
    updatedQuestions[questionIndex].answer = updatedAnswers;
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const addAnswer = (questionIndex) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].answer.push({ Solution: "", correct: false });
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const addQuestion = () => {
    setQuizData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { question: "", answer: [{ Solution: "", correct: false }] },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure every question has at least one valid answer
    for (let question of quizData.questions) {
      if (question.answer.length === 0 || !question.answer.some(ans => ans.Solution)) {
        alert("Each question must have at least one answer.");
        return; // Prevent form submission if there are incomplete answers
      }
    }

    try {
      const formattedData = {
        ...quizData,
        questions: quizData.questions.map((q) => ({
          question: q.question,
          answer: q.answer.map((ans) => ({
            Solution: ans.Solution,
            correct: ans.correct === true, // Convert it to boolean
          })),
        })),
        mentorId: mentorId,
      };

      // Send the data to the backend via Axios
      await AxiosInstance.post("/quiz/createquiz", formattedData);
      setIsDialogOpen(false);
      alert("Quiz created successfully!");
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("An error occurred while creating the quiz");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Create Quiz</Button>
      </DialogTrigger>

      <DialogContent className={"overflow-auto max-h-[80vh]"}>
        <DialogHeader>
          <h2 className="text-xl font-semibold">Create a New Quiz</h2>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 overflow-auto">
          <div>
            <Label htmlFor="menteeId">Mentee Email ID</Label>
            <Input
              id="menteeId"
              name="menteeId"
              value={quizData.menteeId}
              onChange={(e) => handleInputChange("menteeId", e.target.value)}
              required
            />
          </div>

          {quizData.questions.map((q, questionIndex) => (
            <div key={questionIndex} className="space-y-4">
              <Label>Question {questionIndex + 1}</Label>
              <Textarea
                value={q.question}
                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                required
              />
              
              {q.answer.map((answer, answerIndex) => (
                <div key={answerIndex} className="space-y-2">
                  <Label htmlFor={`answer-${questionIndex}-${answerIndex}`}>
                    Answer {answerIndex + 1}
                  </Label>
                  <Input
                    id={`answer-${questionIndex}-${answerIndex}`}
                    value={answer.Solution}
                    onChange={(e) =>
                      handleAnswerChange(
                        questionIndex,
                        answerIndex,
                        "Solution",
                        e.target.value
                      )
                    }
                    required
                  />
                  <Select
                    value={answer.correct ? "true" : "false"}
                    onValueChange={(value) =>
                      handleAnswerChange(
                        questionIndex,
                        answerIndex,
                        "correct",
                        value
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Is this answer correct?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Correct</SelectItem>
                      <SelectItem value="false">Incorrect</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}

              <Button
                type="button"
                onClick={() => addAnswer(questionIndex)}
                variant="outline"
              >
                Add Answer
              </Button>
            </div>
          ))}

          <Button type="button" onClick={addQuestion}>
            Add Question
          </Button>

          <div>
            <Label htmlFor="domain">Domain</Label>
            <Input
              id="domain"
              name="domain"
              value={quizData.domain}
              onChange={(e) => handleInputChange("domain", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="score">Score</Label>
            <Input
              id="score"
              name="score"
              value={quizData.score}
              onChange={(e) => handleInputChange("score", e.target.value)}
              required
            />
          </div>
        </form>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Close
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Create Quiz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
