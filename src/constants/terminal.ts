import { useWindowStore } from "../store/windowStore";
import { useProcessStore } from "../store/processStore";
import { BOOT_TIME } from "./system"

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
      "help        - Show this help",
      "man <cmd>   - Command manual",
      "whoami     - Current user",
      "uptime     - System uptime",
      "neofetch   - System information",
      "open <app> - Launch an application",
      "ps         - List processes",
      "kill <pid> - Kill a process",
      "taskmgr    - Open Task Manager",
      "clear      - Clear terminal",
    ],
  },

  about: {
    description: "About the system",
    run: () => [
      "CyberOS v1.0",
      "Built with React + TypeScript",
    ],
  },

  whoami: {
    description: "Show current user",
    run: () => ["apoorav"],
  },

  man: {
    description: "Command manual",
    run: (args) => {
      const cmd = args[0];
      if (!cmd) return ["Usage: man <command>"];

      const command = TERMINAL_COMMANDS[cmd];
      if (!command) return [`No manual entry for ${cmd}`];

      return [
        `NAME`,
        `  ${cmd}`,
        ``,
        `DESCRIPTION`,
        `  ${command.description}`,
      ];
    },
  },

  uptime: {
    description: "Show system uptime",
    run: () => {
      const seconds = Math.floor((Date.now() - BOOT_TIME) / 1000);
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      return [`Uptime: ${hrs}h ${mins}m ${secs}s`];
    },
  },

  neofetch: {
    description: "System information",
    run: () => [
      "        ▄▄▄▄▄▄▄▄▄▄▄▄▄",
      "        █ CyberOS █",
      "        ▀▀▀▀▀▀▀▀▀▀▀▀▀",
      "",
      "OS:        CyberOS v1.0",
      "Kernel:    React + Zustand",
      "Shell:     cyber-shell",
      "User:      apoorav",
      "CPU:       JavaScript Engine",
      "Memory:    Browser RAM",
      "Uptime:    " + Math.floor((Date.now() - BOOT_TIME) / 1000) + "s",
    ],
  },

  open: {
    description: "Launch an application",
    run: (args) => {
      const app = args[0];
      if (!app) return ["Usage: open <app>"];

      const windowStore = useWindowStore.getState();

      const appMap: Record<string, string> = {
        terminal: "terminal",
        taskmgr: "task-manager",
        browser: "browser",
        files: "file-explorer",
      };

      const appId = appMap[app.toLowerCase()];
      if (!appId) {
        return [
          `Application not found: ${app}`,
          "Try: terminal, taskmgr, browser, files",
        ];
      }

      windowStore.openWindow(appId);
      return [`Launching ${app}...`];
    },
  },

  ps: {
    description: "List running processes",
    run: () => {
      const processes = useProcessStore.getState().processes;
      if (processes.length === 0) return ["No running processes"];

      return [
        "PID   NAME          STATE",
        ...processes.map(
          p => `${p.pid}   ${p.appType.padEnd(12)} ${p.state}`
        ),
      ];
    },
  },

  clear: {
    description: "Clear terminal",
    run: () => [],
  },

  // You can add more commands here
  taskmgr: {
    description: "Open Task Manager",
    run: () => {
      useWindowStore.getState().openWindow("task-manager");
      return ["Opening Task Manager..."];
    },
  },

  kill: {
    description: "Kill a process by PID",
    run: (args) => {
      const pid = Number(args[0]);
      if (!pid) return ["Usage: kill <pid>"];

      const processStore = useProcessStore.getState();
      const windowStore = useWindowStore.getState();

      const proc = processStore.processes.find(p => p.pid === pid);
      if (!proc) return [`No such process: ${pid}`];

      // Close all windows
      windowStore.windows
        .filter(w => w.pid === pid)
        .forEach(w => windowStore.closeWindow(w.id));

      processStore.killProcess(pid);

      return [`Process ${pid} terminated`];
    },
  },
};
