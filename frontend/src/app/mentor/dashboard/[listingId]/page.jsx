"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {
  Package2,
  Home,
  Settings,
  Eye,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 
import { Select } from "@/components/ui/select"; 
import { useState,useEffect,useCallback } from "react";
import SideBar from "@/app/component/MentorSideBar";
import AxiosInstance from "@/lib/AxiosInstance"
import { loadUser } from "@/features/todo/Slice";
import { useAuth } from "@/context/context";
import { useSelector,useDispatch } from "react-redux"
import { useParams } from "next/navigation";
export default function Page() {
    const [summary, setSummary] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [startDate, setStartDate] = useState(""); 
    const [endDate, setEndDate] = useState(""); 
    const [attendeeEmail, setAttendeeEmail] = useState(""); 
    // const [listingId, setlistingId] = useState("");
    const[menteeId,setMenteeId]=useState()
    const[data,setData]=useState()
    const{code, getCode}=useAuth()
   const [mentees,setMentees]=useState([])
   const {listingId}=useParams()
   const [sessionDetails,setsessionDetails]=useState({
    _id: "",
    mentorId: "",
    domain: "",
    topic: "",
    description: "",
    sessionPrice:0,
    sessionStatus: "",
    start: "",
    end: "",
  })

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMentee, setSelectedMentee] = useState({
    mentorId:"",
    summary:"",
    description:"",
    startDate:"",
    endDate:"",
    attendees: [{ email: attendeeEmail }] ,
    menteeId:""
  });
  const [bids,setBids]=useState([]);
  const dispatch= useDispatch()
  useEffect(()=>{
    getCode();
  },[])
useEffect(() => {
    const unsubscribe = dispatch(loadUser());
    return () => unsubscribe(); 
  }, [dispatch]);
 const mentorId=  useSelector(state=>state.auth.currentuser?.uid);

  const createMeeting = async (data) => {
    try {
      const tokens=localStorage.getItem("oAuthToken")
      const response = await AxiosInstance.post(
        `meet/createmeet?mentorId=${mentorId}&menteeId=${data.menteeId}&code=${data.code}&tokens=${tokens}`,
        { ...data }
      );
      setOpenDialog(true);
      console.log("dataaaaaa",response.data)
      return response.data.meetLink
      
      
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };
  const fetchListingById= useCallback(async ()=>{
    const response= await AxiosInstance.get(`/listing/get_listing/${listingId}`)
    setsessionDetails(response.data);
  },[listingId])
  const fetchBid= useCallback(async ()=>{
const response= await AxiosInstance.get(`/bid/bids/listing/${listingId}`)
setBids(response.data);
  },[listingId])
const fetchMentee=useCallback( async ()=>{
  if (!mentorId) {
    console.error('User ID is undefined');
    return;
  }
  const response = await AxiosInstance.get(`/meet/${mentorId}`);
  setMentees(response.data);
},[mentorId]) 
 

  useEffect(()=>{
    fetchMentee();
    fetchBid()
  },[mentorId])


  const handleAccept = async (e) => {
    e.preventDefault();
    try {
      setOpenDialog(true);
      const menteeId = e.target.getAttribute("data-menteeid");
      setMenteeId(menteeId);
      const obj = {
        mentorId,
          summary,
          description,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          attendees: [{ email: attendeeEmail }],
          menteeId,
          code:code
      };
      setData(obj);
       const meetLink= await createMeeting(obj);
      //  console.log(meetId,"iddddddddddddddddddddd")
        const bidId = e.target.getAttribute("data-key");
        if(meetLink){const conversation= await AxiosInstance.put(`/bid/updatebid/${bidId}`,{
          status:"accepted",
          mentorId,
          menteeId,
          meetLink:meetLink
          ,...obj
        })}
        setOpenDialog(false);
    } catch (error) {
      console.error("Error during meeting creation:", error);
    }
  };
const handleReject= async (e)=>{
try {
  const bidId = e.target.getAttribute("data-key");
  const status= await AxiosInstance.put(`/bid/updatebid/${bidId}`,{
    status:"rejected",
    
  })
} catch (error) {
  console.log(error)
}
}
useEffect(()=>{
  fetchBid()
  fetchListingById()
},[listingId])

  return (
    <div className="flex justify-center p-12 w-full h-[100vh]">
      <SideBar/>
      <Tabs defaultValue="account" className="w-[80vw] min-h-[80vh]">
        <TabsList className="grid w-full h-12 grid-cols-2">
          <TabsTrigger value="account">Details and Bids</TabsTrigger>
          <TabsTrigger value="password">Session details</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you are done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <strong>Domain:</strong> {sessionDetails.domain}
              </div>
              <div>
                <strong>Topic:</strong> {sessionDetails.topic}
              </div>
              <div>
                <strong>Description:</strong> {sessionDetails.description}
              </div>
              <div>
                <strong>Price:</strong> ${sessionDetails.sessionPrice}
              </div>
              <div>
                <strong>Status:</strong> {sessionDetails.sessionStatus}
              </div>
              <div>
                <strong>Start:</strong> {new Date(sessionDetails.start).toLocaleString()}
              </div>
              <div>
                <strong>End:</strong> {new Date(sessionDetails.end).toLocaleString()}
              </div>
            </CardContent>
            <CardFooter>
             
            </CardFooter>
          </Card>
          {/* Accordion for Mentees */}
          <Accordion>
            <AccordionItem value="mentee-applications">
              <AccordionTrigger>Mentee Applications</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Start Time</TableHead>
                      <TableHead>End Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bids.map((mentee) => (
                      <TableRow key={mentee._id}  >
                        <TableCell>{mentee.menteeId?.username}</TableCell>
                        <TableCell>{mentee.menteeId?.email}</TableCell>
                        <TableCell>
                        <Dialog>
  <DialogTrigger><Eye className="w-5 h-5 text-blue-500 cursor-pointer" /></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>User Details</DialogTitle>
      <DialogDescription>
        Review the details below.
      </DialogDescription>
    </DialogHeader>
    <div className="space-y-4">
      <div>
        <strong>User Name:</strong> {mentee.menteeId?.username}
      </div>
      <div>
        <strong>Email:</strong> {mentee.menteeId?.email}
      </div>
      <div>
        <strong>Experience:</strong> {mentee.menteeId?.experience || "N/A"}
      </div>
      <div>
        <strong>Description:</strong> {mentee?.description || "N/A"}
      </div>
      <div>
        <strong>Payment Amount:</strong> ${mentee?.payingAmount || "N/A"}
      </div>
      <div>
        <strong>Start Date and Time:</strong> {new Date(mentee.listingId?.start).toLocaleString() || "N/A"}
      </div>
      <div>
        <strong>End Date and Time:</strong> {new Date(mentee.listingId?.end).toLocaleString() || "N/A"}
      </div>
    </div>
  </DialogContent>
  {/* <DialogActions> */}
    {/* <Button onClick={() => setOpenDialog(false)}>Close</Button> */}
    {/* <Button onClick={() => {}}>Confirm</Button> */}
  {/* </DialogActions> */}
</Dialog>

                        </TableCell>
                        <TableCell>
                          {new Date(mentee.start).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {new Date(mentee.end).toLocaleString()}
                        </TableCell>
                        <TableCell>
                        <Dialog key={mentee?._id} open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger>
          <Button className="mr-4 bg-green-400">Accept</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto"> 
          <DialogHeader>
            <DialogTitle>Meeting Details</DialogTitle>
            <DialogDescription>
              Please fill in the details below.
            </DialogDescription>
          </DialogHeader>

          <form className="p-4 space-y-4" onSubmit={handleAccept} data-key={mentee._id} data-menteeid={mentee.menteeId?._id}
>
            <div>
              <label htmlFor="summary" className="block font-bold">Summary:</label>
              <Input
                type="hidden"
                id="menteeId"
                value={mentee.menteeId?._id}
                required
              />
               {`${mentee.menteeId?._id}`}
              <Input
                type="text"
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block font-bold">Description:</label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="start" className="block font-bold">Start Date:</label>
              <Input
                type="datetime-local"
                id="start"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="end" className="block font-bold">End Date:</label>
              <Input
                type="datetime-local"
                id="end"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="attendeeEmail" className="block font-bold">Attendee Email:</label>
              <Input
                type="email"
                id="attendeeEmail"
                value={attendeeEmail}
                onChange={(e) => setAttendeeEmail(e.target.value)}
                required
              />
            </div>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button data-key={mentee?._id} type="submit"
            className="ml-4 bg-green-400 " >
            Confirm
          </Button>
          </form>
        </DialogContent>
      </Dialog>

                          <Button variant="destructive" onClick={handleReject} data-key={mentee._id}>Reject</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Mentee Sessions</CardTitle>
              <CardDescription>
                View and manage your mentees here.
              </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="h-[50vh] overflow-auto">
  <Table className="w-full">
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Details</TableHead>
        <TableHead>Details</TableHead>
        <TableHead>Start Time</TableHead>
        <TableHead>End Time</TableHead>
        <TableHead>Topic</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {mentees.map((mentee) => (
        <TableRow key={mentee._id}>
          <TableCell>{mentee.menteeId?.username}</TableCell>
          <TableCell>{mentee.menteeId?.email}</TableCell>
          <TableCell>
            <a
              href={mentee.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {mentee.meetLink}
            </a>
          </TableCell>
          <TableCell>
            <Dialog>
              <DialogTrigger>
                <Eye className="w-5 h-5 text-blue-500 cursor-pointer" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>User Details</DialogTitle>
                  <DialogDescription>Review the details below.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <strong>User Name:</strong> {mentee.menteeId?.username}
                  </div>
                  <div>
                    <strong>Email:</strong> {mentee.menteeId?.email}
                  </div>
                  <div>
                    <strong>Experience:</strong> {mentee.menteeId?.experience || "N/A"}
                  </div>
                  <div>
                    <strong>Description:</strong> {mentee.description || "N/A"}
                  </div>
                  <div>
                    <strong>Payment Amount:</strong> ${mentee.paymentAmount || "N/A"}
                  </div>
                  <div>
                    <strong>Date and Time:</strong> {new Date(mentee.dateTime).toLocaleString() || "N/A"}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TableCell>
          <TableCell>{new Date(mentee.startDate).toLocaleString()}</TableCell>
          <TableCell>{new Date(mentee.endDate).toLocaleString()}</TableCell>
          <TableCell>{sessionDetails.topic}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>

            </CardContent>
            <CardFooter>
              
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
