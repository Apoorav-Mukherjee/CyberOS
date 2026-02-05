import { useEffect, useRef, useState } from "react";
import { TERMINAL_COMMANDS } from "../constants/terminal";

type OutputLine = {
  id: string;
  text: string;
};

export default function TerminalComponent() {
  const [lines, setLines] = useState<OutputLine[]>([
    { id: crypto.randomUUID(), text: "Welcome to CyberOS Terminal" },
    { id: crypto.randomUUID(), text: "Type 'help' to see available commands." },
  ]);

  const [input, setInput] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Auto focus on mount */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /* Auto scroll on output update */
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [lines]);

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.split(" ");
    const command = TERMINAL_COMMANDS[cmd.toLowerCase()];

    // Echo command
    setLines((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: `$ ${trimmed}` },
    ]);

    if (!command) {
      setLines((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: `Command not found: ${cmd}`,
        },
      ]);
      return;
    }

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    const output = command.run(args);

    setLines((prev) => [
      ...prev,
      ...output.map((text) => ({
        id: crypto.randomUUID(),
        text,
      })),
    ]);
  };

  return (
    <div className="h-full w-full bg-black text-green-400 font-mono text-sm flex flex-col">
      {/* Output */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-3 space-y-1"
      >
        {lines.map((line) => (
          <div key={line.id}>{line.text}</div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-white/10 px-3 py-2 flex items-center gap-2">
        <span className="text-green-500">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              runCommand(input);
              setInput("");
            }
          }}
          className="flex-1 bg-transparent outline-none text-green-400"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
