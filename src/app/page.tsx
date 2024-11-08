import ChatRoom from "./components/ChatRoom";

export default function Home() {
  return (
    <div className="flex h-full w-full font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full">
        <ChatRoom></ChatRoom>
      </main>
    </div>
  );
}
