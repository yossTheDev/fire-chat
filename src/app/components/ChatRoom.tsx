/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../context/authProvider";
import { db } from "../lib/firebaseConfig";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  createdAt: any;
  uid: string;
  displayName: string;
  avatar: string;
}

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const { user } = useAuth();
  const dummy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(loadedMessages);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (messages) {
      dummy.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !user) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        createdAt: serverTimestamp(),
        uid: user.uid,
        displayName: user.displayName,
        avatar: user.photoURL,
      });
      setNewMessage("");
      dummy?.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  return (
    <div className="flex justify-between flex-col w-full max-h-full h-full overflow-hidden bg-gray-100 bg-gradient-to-t from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 dark:border-neutral-950">
      {/* Messages Container */}
      <div className="flex px-4 pt-2 h-full flex-col overflow-y-auto overflow-x-hidden max-h-[100%] mb-4 gap-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{
              x: message.uid === user?.uid ? 50 : -50,
            }}
            whileInView={{ x: 0, scale: 1 }}
            viewport={{ margin: "-10%" }}
            transition={{ type: "spring", stiffness: 70, damping: 12 }}
          >
            <div className="flex gap-2">
              <>
                {message.uid !== user?.uid && (
                  <>
                    {!message.avatar ? (
                      <div className="flex size-10 text-2xl font-bold dark:text-neutral-700 text-neutral-400 bg-neutral-600 dark:bg-neutral-800 rounded-full text-center justify-center items-center">
                        <span> {message.displayName.slice(0, 1)}</span>
                      </div>
                    ) : (
                      <img
                        className="size-10 rounded-full"
                        src={message.avatar}
                        alt="User Photo"
                      ></img>
                    )}
                  </>
                )}
              </>

              <div
                className={`flex flex-col gap-2 p-3  text-sm ${
                  message.uid === user?.uid
                    ? "bg-[#ff833c] text-white self-end rounded-tl-lg rounded-bl-lg rounded-br-lg ml-auto"
                    : "dark:bg-neutral-300 bg-neutral-100 text-black self-start rounded-tr-lg rounded-br-lg rounded-bl-lg"
                }`}
              >
                <span className="font-semibold block">
                  {message.displayName}
                </span>
                <span>{message.text}</span>
              </div>
            </div>
          </motion.div>
        ))}

        <div ref={dummy}></div>
      </div>

      <form onSubmit={handleSendMessage} className="flex items-center p-2">
        <div className="relative flex flex-1">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="w-full pl-4 pr-12 py-4 rounded-full dark:bg-neutral-900 dark:border-neutral-700 dark:text-white border border-gray-300"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#ff833c] hover:bg-[#ff633c] text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
