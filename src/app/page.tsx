import ChatRoom from "./components/ChatRoom";

export default function Home() {
  return (
    <div className="flex h-screen w-screen min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full">
        <ChatRoom></ChatRoom>
      </main>
    </div>
  );
}
