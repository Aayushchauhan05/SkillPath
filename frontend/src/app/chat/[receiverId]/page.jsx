"use client"
import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadUser } from "@/features/todo/Slice";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
export const description =
  "An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.";
import {useRef, useState,useEffect} from "react"
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import AxiosInstance from "@/lib/AxiosInstance";
export default function ChatDashboard() {
  const [chatToggle, setChatToggle] = useState(false);
  const [chats,setChats]=useState([])
  const dispatch= useDispatch()
useEffect(() => {
    const unsubscribe = dispatch(loadUser());
    return () => unsubscribe(); 
  }, [dispatch]);
  const userId = useSelector((state) => state.auth.currentuser?.uid); 

  const {receiverId}=useParams()
const ref=useRef()
  const handleChat = async () => {
    setChatToggle((prev) => !prev);
  };
  const createChat= async (e)=>{
    e.preventDefault();
    try{
const formData= new FormData(ref.current)
const messageText = formData.get('message'); 

console.log(userId)
if (!messageText || messageText.trim() === '') {
  console.error("Message cannot be empty");
  return;
}

const data={
  senderId:userId,
  receiverId: receiverId,
  message:{
    sender:
userId,
    text: messageText
  }
}
await AxiosInstance.post("chat/createchat",{
  ...data
})
ref.current.reset(); 
    }
    catch(e){
console.log(e);
    }
  }

  const fetchChat= async ()=>{
    try {
      const response= await AxiosInstance.get(`chat/chats/${userId}/${receiverId}`);
      console.log(response)
      setChats(response.data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchChat()
  },[chatToggle])
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="fixed left-0 z-20 flex flex-col h-full border-r inset-y"></aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4"></header>
        <main className="grid flex-1 gap-4 p-4 overflow-auto md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative flex-col items-start hidden gap-8 border-2 md:flex border-s-indigo-500"
            x-chunk="dashboard-03-chunk-0 "

          >
            <h1 className="text-3xl">Chat</h1>
            <div
              className="flex items-center justify-around w-full h-24 border-2 border-b-indigo-500"
              onClick={handleChat}
            >
             
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex-col">
                <h5>Aayush chauhan</h5>
                <p className="text-green-500">online</p>
              </div>
            </div>
          </div>
          {chatToggle?<div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
           
      {chats.map((elem)=>
       ( <div className={`chat chat-${elem.message.sender==userId?"end":"start"}`}>
        <div className={`chat-bubble ${elem.message.sender==userId?"chat-bubble-success":"chat-bubble-info"} `}>
         {elem.message.text}
        </div>
      </div>)
      )}
     

      

      <div className="flex-1" />
      <form
        className="relative overflow-hidden border rounded-lg bg-background focus-within:ring-1 focus-within:ring-ring"
        x-chunk="dashboard-03-chunk-1"
        onSubmit={createChat}
        ref={ref}
      >
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
            name="message" 
    id="message"
          placeholder="Type your message here..."
          className="p-3 border-0 shadow-none resize-none min-h-12 focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Paperclip className="size-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Mic className="size-4" />
                  <span className="sr-only">Use Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side=  "top">Use Microphone</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
   : 
    <Card className="max-w-md mx-auto text-white bg-gray-800 rounded-lg shadow-lg h-36">
      <CardHeader className="text-lg font-bold text-center">Chat Room</CardHeader>
      <div className="py-8 text-center">
        <p className="text-gray-400">Chat will appear here</p>
      </div>
    </Card>}
        </main>
      </div>
    </div>
  );
}
