// src/constants/terminal.ts
export type CommandResult = string[];

export type TerminalCommand = {
  description: string;
  run: (args: string[]) => CommandResult;
};

export const TERMINAL_COMMANDS: Record<string, TerminalCommand> = {
  help: {
    description: "List available commands",
    run: () => [
      "Available commands:",
      "help - Show this help",
      "clear - Clear the terminal",
      "about - About CyberOS",
    ],
  },

  about: {
    description: "About the system",
    run: () => [
      "CyberOS v1.0",
      "Built with React + TypeScript",
    ],
  },

  clear: {
    description: "Clear terminal",
    run: () => [],
  },

  // You can add more commands here
  
};
