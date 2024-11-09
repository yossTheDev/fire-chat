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
    <div className="flex flex-col h-full w-full p-4 bg-gray-100 dark:bg-neutral-900 dark:border-neutral-950 shadow-md">
      <div className="flex-1 overflow-y-auto max-h-[80%] mb-4 space-y-2">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{
              opacity: 0,
              x: message.uid === user?.uid ? 50 : -50,
            }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 70, damping: 12 }}
          >
            <div className="flex gap-2">
              <>
                {message.uid !== user?.uid && (
                  <>
                    {!message.avatar ? (
                      <div className="flex size-12 text-2xl font-bold bg-neutral-800 rounded-full text-center justify-center items-center">
                        <span> {message.displayName.slice(0, 1)}</span>
                      </div>
                    ) : (
                      <img
                        className="size-12 rounded-full"
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
                    ? "bg-blue-500 text-white self-end rounded-tl-lg rounded-bl-lg rounded-br-lg"
                    : "bg-gray-300 text-black self-start rounded-tr-lg rounded-br-lg rounded-bl-lg"
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
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 p-2 border dark:border-neutral-950 rounded-l-lg dark:text-white"
        />
        <button
          type="submit"
          className="flex items-center text-sm gap-2 py-2 px-4 justify-center bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          <Send className="size-6"></Send>
        </button>
      </form>
    </div>
  );
}
