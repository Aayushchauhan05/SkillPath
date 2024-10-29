"use client"

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlusCircle, Trash2 } from "lucide-react";
import SideBar from "@/app/component/MentorSideBar";

export default function CourseDialog() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [units, setUnits] = useState([{ title: "", topics: [] }]);
  const [open, setOpen] = useState(false);

  const addUnit = () => {
    setUnits([...units, { title: "", topics: [] }]);
  };

  const addTopic = (unitIndex) => {
    const newUnits = [...units];
    newUnits[unitIndex].topics.push({ title: "", lectures: [] });
    setUnits(newUnits);
  };

  const addLecture = (unitIndex, topicIndex, type) => {
    const newUnits = [...units];
    newUnits[unitIndex].topics[topicIndex].lectures.push({ type, content: "" });
    setUnits(newUnits);
  };

  const updateUnitTitle = (unitIndex, title) => {
    const newUnits = [...units];
    newUnits[unitIndex].title = title;
    setUnits(newUnits);
  };

  const updateTopicTitle = (unitIndex, topicIndex, title) => {
    const newUnits = [...units];
    newUnits[unitIndex].topics[topicIndex].title = title;
    setUnits(newUnits);
  };

  const updateLectureContent = (unitIndex, topicIndex, lectureIndex, content) => {
    const newUnits = [...units];
    newUnits[unitIndex].topics[topicIndex].lectures[lectureIndex].content = content;
    setUnits(newUnits);
  };

  const removeLecture = (unitIndex, topicIndex, lectureIndex) => {
    const newUnits = [...units];
    newUnits[unitIndex].topics[topicIndex].lectures.splice(lectureIndex, 1);
    setUnits(newUnits);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ courseTitle, courseDescription, units });
    alert("Course submitted successfully!");
    setOpen(false); // Close the dialog after submission
  };

  return (
    <div className="ml-4">
      <Dialog  open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button>Create Course</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Your Course</DialogTitle>
            <DialogDescription>Fill in the details below to create a course.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="h-[70vh] overflow-y-scroll">
            <Card className="p-6">
              <CardContent>
                <div className="space-y-2">
                  <label htmlFor="courseTitle">Course Title</label>
                  <Input
                    id="courseTitle"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="courseDescription">Course Description</label>
                  <Textarea
                    id="courseDescription"
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    required
                  />
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {units.map((unit, unitIndex) => (
                    <AccordionItem value={`unit-${unitIndex}`} key={unitIndex}>
                      <AccordionTrigger className="text-left">
                        <Input
                          value={unit.title}
                          onChange={(e) => updateUnitTitle(unitIndex, e.target.value)}
                          placeholder={`Unit ${unitIndex + 1} Title`}
                          className="mr-2"
                        />
                      </AccordionTrigger>
                      <AccordionContent>
                        <Card className="mt-2">
                          <CardHeader>
                            <CardTitle className="text-lg">Topics</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {unit.topics.map((topic, topicIndex) => (
                              <Card key={topicIndex}>
                                <CardHeader>
                                  <Input
                                    value={topic.title}
                                    onChange={(e) => updateTopicTitle(unitIndex, topicIndex, e.target.value)}
                                    placeholder={`Topic ${topicIndex + 1} Title`}
                                  />
                                </CardHeader>
                                <CardContent className="space-y-2">
                                  {topic.lectures.map((lecture, lectureIndex) => (
                                    <div key={lectureIndex} className="flex items-center space-x-2">
                                      <Input
                                        value={lecture.content}
                                        onChange={(e) => updateLectureContent(unitIndex, topicIndex, lectureIndex, e.target.value)}
                                        placeholder={lecture.type === "video" ? "Video URL" : "Text Content"}
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeLecture(unitIndex, topicIndex, lectureIndex)}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  ))}
                                  <div className="flex space-x-2">
                                    <Button type="button" variant="outline" onClick={() => addLecture(unitIndex, topicIndex, "video")}>
                                      Add Video Lecture
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => addLecture(unitIndex, topicIndex, "text")}>
                                      Add Text Lecture
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                            <Button type="button" variant="secondary" onClick={() => addTopic(unitIndex)}>
                              <PlusCircle className="w-4 h-4 mr-2" /> Add Topic
                            </Button>
                          </CardContent>
                        </Card>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Button type="button" onClick={addUnit} variant="secondary" className="mt-4">
                  <PlusCircle className="w-4 h-4 mr-2" /> Add Unit
                </Button>
                <Button type="submit" className="w-full">Publish Course</Button>
              </CardContent>
            </Card>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
