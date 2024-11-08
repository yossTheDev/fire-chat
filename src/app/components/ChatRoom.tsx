/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
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
import { Motion, spring } from "react-motion";

interface Message {
  id: string;
  text: string;
  createdAt: any;
  uid: string;
  displayName: string;
}

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const { user } = useAuth();

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
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100 dark:bg-neutral-900 dark:border-neutral-950 shadow-md">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message) => (
          <Motion
            key={message.id}
            defaultStyle={{
              opacity: 0,
              x: message.uid === user?.uid ? 100 : -100,
            }}
            style={{
              opacity: spring(1, { stiffness: 60, damping: 10 }),
              x: spring(0, { stiffness: 60, damping: 10 }),
            }}
          >
            {(style) => (
              <div
                className={`p-3 mb-2 max-w-xs text-sm ${
                  message.uid === user?.uid
                    ? "bg-blue-500 text-white self-end rounded-tl-lg rounded-bl-lg rounded-br-lg"
                    : "bg-gray-300 text-black self-start rounded-tr-lg rounded-br-lg rounded-bl-lg"
                }`}
                style={{
                  opacity: style.opacity,
                  transform: `translateX(${style.x}px)`,
                }}
              >
                <span className="font-semibold block">
                  {message.displayName}
                </span>
                <span>{message.text}</span>
              </div>
            )}
          </Motion>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 p-2 border rounded-l-lg"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
