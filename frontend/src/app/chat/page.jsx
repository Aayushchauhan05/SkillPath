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

import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
export const description =
  "An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.";
import {useState} from "react"
export default function ChatDashboard() {
  const [chatToggle, setChatToggle] = useState(false);

  const handleChat = async () => {
    setChatToggle((prev) => !prev);
  };
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
              {" "}
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
      <Badge variant="outline" className="absolute right-3 top-3">
        Output
      </Badge>
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-primary">
          What kind of nonsense is this
        </div>
      </div>

      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-accent">
          That's never been done in the history of the Jedi. It's insulting!
        </div>
      </div>

      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-info">Calm down, Anakin.</div>
      </div>

      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-success">
          You have been given a great honor.
        </div>
      </div>

      <div className="flex-1" />
      <form
        className="relative overflow-hidden border rounded-lg bg-background focus-within:ring-1 focus-within:ring-ring"
        x-chunk="dashboard-03-chunk-1"
      >
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
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
              <TooltipContent side="top">Use Microphone</TooltipContent>
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
