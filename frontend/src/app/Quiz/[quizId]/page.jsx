"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Fe", "Cu"],
    correctAnswer: "Au"
  }
]

export default function Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [score, setScore] = useState(0)

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
    } else {
      // Quiz finished
      alert(`Quiz completed! Your score: ${score + (selectedAnswer === quizData[currentQuestion].correctAnswer ? 1 : 0)}/${quizData.length}`)
    }
  }

  const progress = ((currentQuestion + 1) / quizData.length) * 100
  const questionsLeft = quizData.length - currentQuestion - 1

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-4xl">
        <CardHeader className="relative">
          <CardTitle className="text-2xl font-bold">Quiz Panel</CardTitle>
          <div className="absolute px-3 py-1 text-sm font-medium rounded-full top-4 right-4 bg-primary text-primary-foreground">
            {questionsLeft} question{questionsLeft !== 1 ? 's' : ''} left
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress value={progress} className="w-full" />
          <h2 className="text-xl font-semibold">
            Question {currentQuestion + 1} of {quizData.length}
          </h2>
          <p className="text-lg">{quizData[currentQuestion].question}</p>
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect} className="space-y-4">
            {quizData[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center p-2 space-x-2 transition-colors rounded-lg hover:bg-gray-100">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-grow text-base cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleNextQuestion} 
            disabled={!selectedAnswer}
            className="w-full py-6 text-lg"
          >
            {currentQuestion === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}