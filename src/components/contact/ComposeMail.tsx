import { useState } from "react";
import { useMailStore } from "../../store/mailStore";

interface Props {
  onClose: () => void;
}

export function ComposeMail({ onClose }: Props) {
  const sendMail = useMailStore((s) => s.sendMail);

  const [from, setFrom] = useState("me@cyberos");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const submit = () => {
    if (!subject.trim() || !body.trim()) return;

    sendMail({
      from,
      subject,
      body,
    });

    onClose();
  };

  return (
    <div className="p-4 space-y-3">
      <input
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="w-full bg-transparent border border-white/10 px-2 py-1 rounded"
        placeholder="From"
      />

      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full bg-transparent border border-white/10 px-2 py-1 rounded"
        placeholder="Subject"
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full h-40 bg-transparent border border-white/10 px-2 py-1 rounded resize-none"
        placeholder="Write your message..."
      />

      <div className="flex gap-2">
        <button
          onClick={submit}
          className="px-3 py-1 rounded bg-green-600 hover:bg-green-500"
        >
          Send
        </button>

        <button
          onClick={onClose}
          className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
