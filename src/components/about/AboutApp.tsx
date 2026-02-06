import { useState } from "react";
import { motion } from "framer-motion";

type Mode = "idle" | "info" | "help";

export default function AboutApp() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<Mode>("idle");

  const submit = () => {
    const q = query.trim().toLowerCase();
    if (!q) return;

    if (q === "cyberos" || q === "about" || q === "version") {
      setMode("info");
      return;
    }

    if (q === "help") {
      setMode("help");
      return;
    }

    if (q.startsWith("http")) {
      window.open(q, "_blank");
      return;
    }

    // default → web search
    window.open(
      `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
      "_blank"
    );
  };

  return (
    <motion.div 
      className="h-full w-full flex flex-col text-white"
      initial={{ opacity: 0, y: 6}}
      animate={{ opacity: 1, y: 0}}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="border-b border-white/10 px-4 py-3">
        <div className="text-lg font-semibold">CyberOS Search</div>
        <div className="text-xs opacity-70">
          System info • Web search • Quick launch
        </div>
      </div>

      {/* Input */}
      <div className="p-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Search CyberOS or the web…"
          className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 outline-none"
          autoFocus
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        {mode === "idle" && (
          <div className="opacity-60">
            Try: <code>cyberos</code>, <code>version</code>, or a web query
          </div>
        )}

        {mode === "info" && (
          <div className="space-y-3">
            <div className="text-xl font-semibold">CyberOS</div>
            <div className="text-sm opacity-80">
              A web-based desktop OS portfolio
            </div>

            <div className="text-sm space-y-1">
              <div>Version: 1.0.0</div>
              <div>Tech: React, TypeScript, Zustand, Tailwind</div>
              <div>Window System: Custom</div>
            </div>
          </div>
        )}

        {mode === "help" && (
          <div className="space-y-2 text-sm">
            <div>Supported commands:</div>
            <ul className="list-disc list-inside opacity-80">
              <li>cyberos</li>
              <li>about</li>
              <li>version</li>
              <li>help</li>
              <li>http://example.com</li>
              <li>any search query</li>
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
