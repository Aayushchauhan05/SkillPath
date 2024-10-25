"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"; // Ensure this is the correct path
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"; // Import Calendar
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Import Popover
import { Calendar as CalendarIcon } from "lucide-react"; // Import Calendar Icon
import { format } from "date-fns"; // Import date-fns for formatting
import { useState } from "react";

const EventDialog = () => {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [timeZone, setTimeZone] = useState("America/Los_Angeles");
  const [attendees, setAttendees] = useState([
    { email: "", responseStatus: "needsAction" },
  ]);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      summary,
      description,
      start: {
        dateTime: startDateTime,
        timeZone,
      },
      end: {
        dateTime: endDateTime,
        timeZone,
      },
      attendees,
    };

    console.log(eventData); // Handle the form submission logic here
    setOpen(false); // Close the dialog after submission
  };

  const handleAttendeeChange = (index, value) => {
    const newAttendees = [...attendees];
    newAttendees[index] = { ...newAttendees[index], email: value };
    setAttendees(newAttendees);
  };

  const addAttendee = () => {
    setAttendees([...attendees, { email: "", responseStatus: "needsAction" }]);
  };

  return (
    <div >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button>Create Event</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
            <DialogDescription>
              Fill in the details below to create an event.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}  className="h-[70vh] overflow-y-scroll">
            <Card className="p-6">
              {" "}
              {/* Add padding to the card */}
              <CardContent>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>

                {/* Use margin classes for spacing */}
                <div className="mb-4">
                  <label htmlFor="summary">Summary</label>
                  <Input
                    id="summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Enter event summary"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="description">Description</label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter event description"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="startDateTime">Start Date & Time</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="justify-start w-full font-normal text-left"
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {startDateTime
                          ? format(startDateTime, "PPP")
                          : "Pick a start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDateTime}
                        onSelect={(date) => {
                          setStartDateTime(date);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="mb-4">
                  <label htmlFor="endDateTime">End Date & Time</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="justify-start w-full font-normal text-left"
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {endDateTime
                          ? format(endDateTime, "PPP")
                          : "Pick an end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDateTime}
                        onSelect={(date) => {
                          setEndDateTime(date);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="mb-4">
                  <label htmlFor="timeZone">Time Zone</label>
                  <select
                    id="timeZone"
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="America/Los_Angeles">
                      America/Los_Angeles
                    </option>
                    <option value="America/New_York">America/New_York</option>
                    {/* Add more time zones as needed */}
                  </select>
                </div>

                {attendees.map((attendee, index) => (
                  <div key={index} className="mb-4">
                    <label htmlFor={`attendee${index}`}>Attendee Email</label>
                    <Input
                      id={`attendee${index}`}
                      value={attendee.email}
                      onChange={(e) =>
                        handleAttendeeChange(index, e.target.value)
                      }
                      placeholder="Enter attendee email"
                      required
                    />
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={addAttendee}
                >
                  Add Attendee
                </Button>

                <Button type="submit" colorScheme="blue" className="mt-4">
                  Submit
                </Button>
              </CardContent>
            </Card>
          </form>
        </DialogContent>

        <DialogFooter>
          {/* <Button onClick={() => setOpen(false)} variant="outline">
            Close
          </Button> */}
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default EventDialog;
