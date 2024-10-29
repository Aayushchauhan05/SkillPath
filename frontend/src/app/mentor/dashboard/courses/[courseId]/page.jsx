"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, PlayCircle, FileText, HelpCircle, Lock, Book } from "lucide-react";

// Sample course data
const courseData = {
  title: "Advanced Web Development",
  description: "Master modern web technologies and frameworks",
  instructor: "Alex Johnson",
  duration: "10 weeks",
  units: [
    {
      id: 1,
      title: "Frontend Fundamentals",
      topics: [
        {
          id: 1,
          title: "HTML5 and CSS3",
          lectures: [
            { id: 1, title: "Introduction to HTML5", type: "video", duration: "15:00", completed: true },
            { id: 2, title: "CSS3 Styling Techniques", type: "video", duration: "20:00", completed: true },
            { id: 3, title: "Responsive Design Principles", type: "text", duration: "10 min read", completed: false },
            { id: 4, title: "HTML/CSS Quiz", type: "quiz", duration: "15 min", completed: false },
          ]
        },
        {
          id: 2,
          title: "JavaScript Essentials",
          lectures: [
            { id: 5, title: "JavaScript Basics", type: "video", duration: "25:00", completed: false },
            { id: 6, title: "Working with DOM", type: "video", duration: "30:00", completed: false },
            { id: 7, title: "ES6+ Features", type: "text", duration: "15 min read", completed: false },
            { id: 8, title: "JavaScript Coding Challenge", type: "quiz", duration: "30 min", completed: false },
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Backend Development",
      topics: [
        {
          id: 3,
          title: "Node.js Fundamentals",
          lectures: [
            { id: 9, title: "Introduction to Node.js", type: "video", duration: "20:00", completed: false },
            { id: 10, title: "Building RESTful APIs", type: "video", duration: "35:00", completed: false },
            { id: 11, title: "Database Integration", type: "text", duration: "20 min read", completed: false },
            { id: 12, title: "Node.js Quiz", type: "quiz", duration: "20 min", completed: false },
          ]
        },
        {
          id: 4,
          title: "Server Deployment",
          lectures: [
            { id: 13, title: "Cloud Hosting Options", type: "video", duration: "25:00", completed: false },
            { id: 14, title: "Containerization with Docker", type: "video", duration: "40:00", completed: false },
            { id: 15, title: "CI/CD Pipelines", type: "text", duration: "15 min read", completed: false },
            { id: 16, title: "Deployment Quiz", type: "quiz", duration: "25 min", completed: false },
          ]
        }
      ]
    }
  ]
};

export default function Page() {
  const [expandedUnits, setExpandedUnits] = useState([]);
  const [expandedTopics, setExpandedTopics] = useState([]);

  const toggleUnit = (unitId) => {
    setExpandedUnits((prev) =>
      prev.includes(unitId) ? prev.filter((id) => id !== unitId) : [...prev, unitId]
    );
  };

  const toggleTopic = (topicId) => {
    setExpandedTopics((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const totalLectures = courseData.units.flatMap((unit) =>
    unit.topics.flatMap((topic) => topic.lectures)
  ).length;

  const completedLectures = courseData.units.flatMap((unit) =>
    unit.topics.flatMap((topic) => topic.lectures.filter((lecture) => lecture.completed))
  ).length;

  const progress = (completedLectures / totalLectures) * 100;

  const getLectureIcon = (type) => {
    switch (type) {
      case "video":
        return <PlayCircle className="w-4 h-4 text-blue-500" />;
      case "text":
        return <FileText className="w-4 h-4 text-green-500" />;
      case "quiz":
        return <HelpCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Book className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="container max-w-4xl p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">{courseData.title}</h1>
      <p className="mb-4 text-muted-foreground">{courseData.description}</p>
      <div className="flex items-center mb-6 space-x-4">
        <Badge variant="secondary">Instructor: {courseData.instructor}</Badge>
        <Badge variant="outline">Duration: {courseData.duration}</Badge>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full" />
          <p className="mt-2 text-sm text-muted-foreground">
            {completedLectures} of {totalLectures} lectures completed ({Math.round(progress)}%)
          </p>
        </CardContent>
      </Card>

      <Accordion type="multiple" value={expandedUnits} onValueChange={setExpandedUnits}>
        {courseData.units.map((unit) => (
          <AccordionItem value={unit.id.toString()} key={unit.id}>
            <AccordionTrigger onClick={() => toggleUnit(unit.id.toString())}>
              <span className="text-lg font-semibold">{unit.title}</span>
            </AccordionTrigger>
            <AccordionContent>
              <Accordion type="multiple" value={expandedTopics} onValueChange={setExpandedTopics}>
                {unit.topics.map((topic) => (
                  <AccordionItem value={topic.id.toString()} key={topic.id} className="pl-4 ml-2 border-l">
                    <AccordionTrigger onClick={() => toggleTopic(topic.id.toString())}>
                      <span className="font-medium text-md">{topic.title}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {topic.lectures.map((lecture) => (
                          <li key={lecture.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                            <div className="flex items-center space-x-2">
                              {getLectureIcon(lecture.type)}
                              <span>{lecture.title}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">{lecture.duration}</span>
                              {lecture.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              ) : (
                                <Button size="sm" variant="ghost">
                                  <Lock className="w-4 h-4 mr-2" />
                                  Start
                                </Button>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
