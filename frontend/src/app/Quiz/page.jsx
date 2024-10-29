"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  const quizCategories = [
    {
      name: "Business Quiz",
      quizzes: ["Marketing Basics", "Financial Management", "Entrepreneurship"]
    },
    {
      name: "Tech Quiz",
      quizzes: ["Artificial Intelligence", "Cybersecurity", "Cloud Computing"]
    },
    {
      name: "Programming Quiz",
      quizzes: ["JavaScript Fundamentals", "Python Basics", "Data Structures"]
    },
    {
      name: "General Knowledge Quiz",
      quizzes: ["World History", "Geography", "Current Affairs"]
    }
  ]

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">Choose Your Quiz</h1>
      <div className="grid gap-8">
        {quizCategories.map((category, index) => (
          <section key={index}>
            <h2 className="mb-4 text-2xl font-semibold">{category.name}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.quizzes.map((quiz, quizIndex) => (
                <Card key={quizIndex} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{quiz}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">
                      Test your knowledge in {quiz.toLowerCase()}.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Start Quiz</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}