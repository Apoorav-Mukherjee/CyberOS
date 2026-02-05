import { useState } from "react";
import { MailList } from "./MailList";
import { MailView } from "./MailView";
import { ComposeMail } from "./ComposeMail";

export default function ContactApp() {
  const [composing, setComposing] = useState(false);

  return (
    <div className="flex h-full text-white">
      {/* Inbox */}
      <div className="w-1/3 border-r border-white/10">
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
          <span className="font-semibold">Inbox</span>
          <button
            onClick={() => setComposing(true)}
            className="text-sm px-2 py-1 rounded bg-white/10 hover:bg-white/20"
          >
            Compose
          </button>
        </div>

        <MailList />
      </div>

      {/* Content */}
      <div className="flex-1">
        {composing ? (
          <ComposeMail onClose={() => setComposing(false)} />
        ) : (
          <MailView />
        )}
      </div>
    </div>
  );
}
