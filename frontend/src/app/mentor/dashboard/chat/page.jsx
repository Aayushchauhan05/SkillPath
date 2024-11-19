"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { addMessage } from "@/features/todo/chatSlice";
import useSocketMsg from "@/context/useSocketMsg";
import AxiosInstance from "@/lib/AxiosInstance";
import { loadUser } from "@/features/todo/Slice";
import SideBar from "@/app/component/MentorSideBar"
export default function ChatDashboard() {
  const [chatToggle, setChatToggle] = useState(false);
  const [chatId, setChatId] = useState("");
  const dispatch = useDispatch();
  const [conversation, setConversation] = useState([]);
  const ref = useRef(null);
  const messagesEndRef = useRef(null);

  useSocketMsg();


  useEffect(() => {
    const unsubscribe = dispatch(loadUser());
    return () => unsubscribe();
  }, [dispatch]);

  
  const chats = useSelector((state) => state.chat.messages);
  const userId = useSelector((state) => state.auth.currentuser?.uid);

  
  const handleChat = (e) => {
    console.log("clicking>>>");

    const receiverId = e.currentTarget.getAttribute("data-key");

    console.log("Receiver ID:", receiverId); 

    if (receiverId) {
      setChatId(receiverId); 
      setChatToggle(true); 
    }
  };

 
  const handleUserConversations = useCallback(async () => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    try {
      const response = await AxiosInstance.get(`/conversation/conversations/user/${userId}`);
      setConversation(response.data || []);
      console.log(response.data); // Log conversations data
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  }, [userId]);

  // Create new chat message
  const createChat = async (e) => {
    e.preventDefault();
    if (!ref.current) return;

    const formData = new FormData(ref.current);
    const messageText = formData.get("message")?.toString().trim();

    if (!messageText) return;

    const data = {
      senderId: userId,
      receiverId: chatId,
      message: { sender: userId, text: messageText },
    };

    try {
      await AxiosInstance.post("chat/createchat", { ...data });
      dispatch(addMessage(data.message));
      ref.current.reset();
    } catch (e) {
      console.error("Error creating chat:", e);
    }
  };

 
  useEffect(() => {
    if (!chatToggle || !userId || !chatId) return;

    const fetchChatMessages = async () => {
      try {
        const response = await AxiosInstance.get(`chat/chats/${userId}/${chatId}`);
        response.data.forEach((chat) => dispatch(addMessage(chat.message)));
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchChatMessages();
  }, [chatToggle, userId, chatId, dispatch]);

 
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  
  useEffect(() => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }
    handleUserConversations();
  }, [userId, handleUserConversations]);

  
  useEffect(() => {
    if (!userId || !chatId) return;
    if (typeof window !== "undefined" && window.socket) {
      console.log("Socket initialized and ready");
    } else {
      console.error("Socket is not initialized");
    }
  }, [userId, chatId]);

  return (
    <div className="flex w-full h-screen text-white bg-black">
    <aside className="w-[4vw] max-w-[300px] bg-neutral-900 border-r border-neutral-800">
       <SideBar/>
      </aside>
      <aside className="w-full max-w-[300px] bg-neutral-900 border-r border-neutral-800">
        <div className="flex items-center justify-between p-4 bg-neutral-800">
          <h1 className="text-xl font-bold">Chats</h1>
        </div>
        <div className="h-full overflow-y-auto">
          {(conversation[0]?.conversations || []).map((elem) => (
            <div
              key={elem._id}
              className="flex items-center justify-between p-4 transition-all border-b cursor-pointer border-neutral-800 hover:bg-neutral-700"
              onClick={handleChat}
              data-key={elem._id}
            >
              <div>
                <h5 className="font-semibold text-white">{elem.username}</h5>
                <p className="text-sm text-neutral-400">{elem.email}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 bg-black">
        {chatToggle ? (
          <>
            <div className="flex items-center justify-between p-4 border-b bg-neutral-800 border-neutral-700">
              <h2 className="text-xl font-bold">Chat</h2>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {chats.map((elem, index) => (
                <div
                  key={index}
                  className={`flex ${
                    elem.sender === userId ? "justify-end" : "justify-start"
                  } mb-3`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-[75%] ${
                      elem.sender === userId
                        ? "bg-blue-800 text-white"
                        : "bg-neutral-800 text-white"
                    }`}
                  >
                    {elem.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form
              onSubmit={createChat}
              ref={ref}
              className="flex items-center gap-4 p-4 border-t bg-neutral-900 border-neutral-800"
            >
              <textarea
                name="message"
                placeholder="Type a message..."
                className="flex-1 p-3 text-white border resize-none bg-neutral-800 border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="px-5 py-2 text-white transition bg-blue-800 rounded-xl hover:bg-blue-700 active:scale-95"
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-neutral-500">
            <p className="text-lg">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
