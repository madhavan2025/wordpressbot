import { cookies } from "next/headers";

import { DataStreamHandler } from "@/components/data-stream-handler";
import { generateUUID } from "@/lib/utils";
import { FloatingChat } from "@/components/FloatingChat";
import { Chat } from "@/components/chat";
import { EmbedChatHeader } from "@/components/EmbedChatHeader";

export default async function Page({
  searchParams,
}: {
  searchParams: { embed?: string };
}) {
  const cookieStore = cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");

  const chatId = generateUUID();

  const isEmbedMode = searchParams?.embed === "true";

  return (
    <>
      {isEmbedMode ? (
        // 🧩 EMBED MODE → Only chat window
        <div className="h-screen w-full flex flex-col">
          {/* 🔵 CHATBOT HEADER */}
          <EmbedChatHeader />

          <div className="flex-1 overflow-hidden">
            <Chat
              id={chatId}
              initialMessages={[]}
              initialVisibilityType="public"
              isReadonly={false}
              autoResume={true}
            />
          </div>
        </div>
      ) : (
        // 💬 NORMAL MODE → Floating launcher
        <FloatingChat chatId={chatId} />
      )}

      <DataStreamHandler />
    </>
  );
}