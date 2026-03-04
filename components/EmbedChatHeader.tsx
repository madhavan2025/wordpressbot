"use client";
import { X } from "lucide-react";
export function EmbedChatHeader() {
  const closeChat = () => {
    window.parent.postMessage("closeChat", "*");
  };

  return (
    <div className="h-14 bg-[#6FA8E8] text-white flex items-center justify-between px-4 shrink-0">
        <span className="font-semibold">Sykalab-AI-ShopAgent</span>
      <button
        onClick={closeChat}
        className="text-white text-xl leading-none hover:opacity-80"
        aria-label="Close chat"
      >
        <X size={20} />
      </button>
    </div>
  );
}
