"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "@/features/todo/Slice";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import AxiosInstance from "@/lib/AxiosInstance";

const EventDialog = () => {
  const [domain, setDomain] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [sessionPrice, setSessionPrice] = useState("");
  const [sessionStatus, setSessionStatus] = useState("active");
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.currentuser?.uid);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const eventData = {
      mentorId: userId,
      domain,
      topic,
      description,
      sessionPrice: Number(sessionPrice),
      sessionStatus,
      start: startDateTime,
      end: endDateTime,
    };

    try {
      const response = await AxiosInstance.post("/listing/create_listing", { ...eventData });
      console.log(response);
      setOpen(false);
    } catch (error) {
      console.error("Error creating listing", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString("en-US") : "Pick a date";
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button>Create Listing</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Listing</DialogTitle>
            <DialogDescription>Fill in the details below to create a listing.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="h-[70vh] overflow-y-scroll">
            <Card className="p-6">
              <CardContent>
                <CardHeader>
                  <CardTitle>Listing Details</CardTitle>
                </CardHeader>

                <div className="mb-4">
                  <label htmlFor="domain">Domain</label>
                  <Input
                    id="domain"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter domain"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="topic">Topic</label>
                  <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter topic"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="description">Description</label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="sessionPrice">Session Price</label>
                  <Input
                    id="sessionPrice"
                    type="number"
                    value={sessionPrice}
                    onChange={(e) => setSessionPrice(e.target.value)}
                    placeholder="Enter session price"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="sessionStatus">Session Status</label>
                  <select
                    id="sessionStatus"
                    value={sessionStatus}
                    onChange={(e) => setSessionStatus(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="startDateTime">Start Date & Time</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start w-full font-normal text-left">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {formatDate(startDateTime)}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDateTime} onSelect={(date) => setStartDateTime(date)} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="mb-4">
                  <label htmlFor="endDateTime">End Date & Time</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start w-full font-normal text-left">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {formatDate(endDateTime)}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={endDateTime} onSelect={(date) => setEndDateTime(date)} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <Button type="submit" className="mt-4" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </CardContent>
            </Card>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventDialog;
