"use client"
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import AxiosInstance from "@/lib/AxiosInstance";
import { useParams } from "next/navigation";
import { FaUser, FaLayerGroup, FaClipboardList, FaDollarSign, FaRegCalendarAlt, FaHourglassHalf } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import MenteeSideBar from "@/app/component/MenteeSideBar";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "@/features/todo/Slice";

const LoadingSessionDetails = () => (
  <div className="space-y-4">
    <div className="flex items-center space-x-4">
      <Skeleton className="w-4 h-4" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
    <div className="flex items-center space-x-4">
      <Skeleton className="w-4 h-4" />
      <Skeleton className="h-4 w-[150px]" />
    </div>
    <div className="flex items-center space-x-4">
      <Skeleton className="w-4 h-4" />
      <Skeleton className="h-4 w-[180px]" />
    </div>
    <div className="flex items-center space-x-4">
      <Skeleton className="w-4 h-4" />
      <Skeleton className="h-4 w-[250px]" />
    </div>
    <div className="flex items-center space-x-4">
      <Skeleton className="w-4 h-4" />
      <Skeleton className="h-4 w-[120px]" />
    </div>
    <div className="flex items-center space-x-4">
      <Skeleton className="w-4 h-4" />
      <Skeleton className="h-4 w-[160px]" />
    </div>
  </div>
);

const LoadingBidForm = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4, 5, 6].map((index) => (
      <div key={index} className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="w-full h-10" />
      </div>
    ))}
    <Skeleton className="h-10 w-[100px]" />
  </div>
);

export default function Page() {
  const { listingId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = dispatch(loadUser());
    return () => unsubscribe();
  }, [dispatch]);

  const userId = useSelector(state => state.auth.currentuser?.uid);

  const [bid, setBid] = useState({
    mentorId: "",
    listingId: "",
    menteeId: "",
    name: "",
    phone: "",
    email: "",
    topic: "",
    description: "",
    payingAmount: ""
  });

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await AxiosInstance.get(`listing/get_listing/${listingId}`);
      setData(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [listingId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleBidChange = (e) => {
    const { id, value } = e.target;
    setBid(prevBid => ({ ...prevBid, [id]: value }));
  };

  const handleBidSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await AxiosInstance.post("/bid/createbid", {
        ...bid,
        mentorId: data.mentorId,
        menteeId: userId,
        listingId: listingId
      });
      setBid({
        mentorId: "",
        listingId: "",
        menteeId: "",
        name: "",
        phone: "",
        email: "",
        topic: "",
        description: "",
        payingAmount: ""
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <MenteeSideBar />
      <Tabs defaultValue="sessionDetails" className="w-[80vw] h-[80vh]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sessionDetails">Session Details</TabsTrigger>
          <TabsTrigger value="bid">Bid</TabsTrigger>
        </TabsList>

        <TabsContent value="sessionDetails">
          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
              <CardDescription>
                Detailed information about the mentoring session.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {isLoading ? (
                <LoadingSessionDetails />
              ) : data ? (
                <>
                  <div className="flex items-center space-y-1">
                    <FaUser className="mr-2 text-blue-500" />
                    <Label>Mentor ID:</Label>
                    <p>{data.mentorId}</p>
                  </div>
                  <div className="flex items-center space-y-1">
                    <FaLayerGroup className="mr-2 text-green-500" />
                    <Label>Domain:</Label>
                    <p>{data.domain}</p>
                  </div>
                  <div className="flex items-center space-y-1">
                    <FaClipboardList className="mr-2 text-purple-500" />
                    <Label>Topic:</Label>
                    <p>{data.topic}</p>
                  </div>
                  <div className="flex items-center space-y-1">
                    <MdDescription className="mr-2 text-yellow-500" />
                    <Label>Description:</Label>
                    <p>{data.description}</p>
                  </div>
                  <div className="flex items-center space-y-1">
                    <FaDollarSign className="mr-2 text-red-500" />
                    <Label>Session Price:</Label>
                    <p>₹{data.sessionPrice}</p>
                  </div>
                  <div className="flex items-center space-y-1">
                    <FaHourglassHalf className="mr-2 text-gray-500" />
                    <Label>Session Status:</Label>
                    <p>{data.sessionStatus}</p>
                  </div>
                  <div className="flex items-center space-y-1">
                    <FaRegCalendarAlt className="mr-2 text-blue-500" />
                    <Label>Start:</Label>
                    <p>{new Date(data.start).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center space-y-1">
                    <FaRegCalendarAlt className="mr-2 text-blue-500" />
                    <Label>End:</Label>
                    <p>{new Date(data.end).toLocaleString()}</p>
                  </div>
                </>
              ) : (
                <p>No session details available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bid">
          <Card>
            <CardHeader>
              <CardTitle>Place a Bid</CardTitle>
              <CardDescription>Enter your details to bid on this session.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {isLoading ? (
                <LoadingBidForm />
              ) : (
                <>
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={bid.name} onChange={handleBidChange} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={bid.phone} onChange={handleBidChange} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={bid.email} onChange={handleBidChange} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="topic">Topic</Label>
                    <Input id="topic" value={bid.topic} onChange={handleBidChange} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" value={bid.description} onChange={handleBidChange} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="payingAmount">Paying Amount</Label>
                    <Input id="payingAmount" value={bid.payingAmount} onChange={handleBidChange} />
                  </div>
                  
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleBidSubmit} 
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? "Submitting..." : "Submit Bid"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}