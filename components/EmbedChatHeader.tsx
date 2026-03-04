"use client";
import { X, Sun, Moon, Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";

export function EmbedChatHeader() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const closeChat = () => {
    window.parent.postMessage("closeChat", "*");
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    window.parent.postMessage(
      { type: "toggleExpand", value: !isFullScreen },
      "*"
    );
  };

  return (
    <div className="h-14 bg-[#6FA8E8] text-white flex items-center justify-between px-4 shrink-0">
      <span className="font-semibold">Sykalab-AI-ShopAgent</span>

      <div className="flex items-center gap-3">
        {/* Dark Mode */}
        <button onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Expand */}
        <button onClick={toggleFullScreen}>
          {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>

        {/* Close */}
        <button onClick={closeChat}>
          <X size={20} />
        </button>
      </div>
    </div>
  );
}