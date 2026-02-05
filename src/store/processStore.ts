import { create } from "zustand";
import type { Process } from "../types/process";
import type { WindowType } from "../types/window";

let pidCounter = 100;

interface ProcessStore {
  processes: Process[];

  spawnProcess: (appType: WindowType) => number;
  attachWindow: (pid: number, windowId: string) => void;
  killProcess: (pid: number) => void;
}

export const useProcessStore = create<ProcessStore>((set) => ({
  processes: [],

  spawnProcess: (appType) => {
    const pid = pidCounter++;

    set((state) => ({
      processes: [
        ...state.processes,
        {
          pid,
          appType,
          windows: [],
          startedAt: Date.now(),
          state: "running",
        },
      ],
    }));

    return pid;
  },

  attachWindow: (pid, windowId) =>
    set((state) => ({
      processes: state.processes.map((p) =>
        p.pid === pid
          ? { ...p, windows: [...p.windows, windowId] }
          : p
      ),
    })),

  killProcess: (pid) =>
    set((state) => ({
      processes: state.processes.map((p) =>
        p.pid === pid ? { ...p, state: "terminated" } : p
      ),
    })),
}));
