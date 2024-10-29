"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen } from "lucide-react"

// Sample course data
const courses = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React and build your first app",
    instructor: "Jane Doe",
    level: "Beginner",
    duration: "4 weeks"
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    description: "Deep dive into advanced JavaScript topics and patterns",
    instructor: "John Smith",
    level: "Advanced",
    duration: "6 weeks"
  },
  {
    id: 3,
    title: "Python for Data Science",
    description: "Use Python to analyze and visualize data",
    instructor: "Emily Johnson",
    level: "Intermediate",
    duration: "8 weeks"
  },
  {
    id: 4,
    title: "Web Design Fundamentals",
    description: "Learn the principles of effective web design",
    instructor: "Michael Brown",
    level: "Beginner",
    duration: "5 weeks"
  },
  {
    id: 5,
    title: "Machine Learning Basics",
    description: "Introduction to machine learning algorithms and applications",
    instructor: "Sarah Lee",
    level: "Intermediate",
    duration: "10 weeks"
  }
]

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState(null)

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCourseSelect = (course) => {
    setSelectedCourse(course)
    // In a real application, this would navigate to the course detail page
    // For this example, we'll just log the selected course
    console.log("Selected course:", course)
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Available Courses</h1>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-2 text-muted-foreground">{course.description}</p>
              <p className="text-sm">Instructor: {course.instructor}</p>
              <div className="flex items-center mt-2 space-x-2">
                <Badge variant="secondary">{course.level}</Badge>
                <Badge variant="outline">{course.duration}</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleCourseSelect(course)}>
                <BookOpen className="w-4 h-4 mr-2" /> Start Learning
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filteredCourses.length === 0 && (
        <p className="mt-6 text-center text-muted-foreground">No courses found matching your search.</p>
      )}
    </div>
  )
}