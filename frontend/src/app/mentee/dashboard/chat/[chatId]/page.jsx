"use client"
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { addMessage, clearMessages } from "@/features/todo/chatSlice";
import useSocketMsg from "@/context/useSocketMsg";

export default function ChatDashboard() {
  const [chatToggle, setChatToggle] = useState(false);
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.messages);
  const userId = useSelector((state) => state.auth.currentuser?.uid);
  const { chatId } = useParams();
  const ref = useRef();
  const messagesEndRef = useRef(null);

  useSocketMsg();

  const handleChat = () => {
    setChatToggle((prev) => !prev);
  };

  const createChat = async (e) => {
    e.preventDefault();
    const formData = new FormData(ref.current);
    const messageText = formData.get("message").trim();

    if (!messageText) {
      console.error("Message cannot be empty");
      return;
    }

    const data = {
      senderId: userId,
      chatId,
      message: {
        sender: userId,
        text: messageText,
      },
    };

    try {
      await AxiosInstance.post("chat/createchat", { ...data });
      dispatch(addMessage(data.message));
      ref.current.reset();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (chatToggle) {
      (async () => {
        try {
          const response = await AxiosInstance.get(`chat/chats/${userId}/${chatId}`);
          response.data.forEach((chat) => dispatch(addMessage(chat.message)));
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [chatToggle, userId, chatId, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <>
      <div className="grid h-screen w-full pl-[56px]">
        <aside className="fixed left-0 z-20 flex flex-col h-full border-r inset-y"></aside>
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4"></header>
          <main className="grid flex-1 gap-4 p-4 overflow-auto md:grid-cols-2 lg:grid-cols-3">
            <div
              className="relative flex-col items-start hidden gap-8 border-2 md:flex border-s-indigo-500"
            >
              <h1 className="text-3xl">Chat</h1>
              <div
                className="flex items-center justify-around w-full h-24 border-2 border-b-indigo-500"
                onClick={handleChat}
              >
                <div className="flex-col">
                  <h5>Aayush Chauhan</h5>
                  <p className="text-green-500">online</p>
                </div>
              </div>
            </div>
            {chatToggle ? (
              <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                {chats.map((elem, index) => (
                  <div
                    key={index}
                    className={`chat chat-${elem.sender === userId ? "end" : "start"}`}
                  >
                    <div
                      className={`chat-bubble ${
                        elem.sender === userId ? "chat-bubble-success" : "chat-bubble-info"
                      }`}
                    >
                      {elem.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
                <form
                  className="relative overflow-hidden border rounded-lg bg-background"
                  onSubmit={createChat}
                  ref={ref}
                >
                  <textarea
                    name="message"
                    placeholder="Type your message here..."
                    className="p-3 border-0 shadow-none resize-none min-h-12 focus-visible:ring-0"
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            ) : (
              <div>Chat will appear here</div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
