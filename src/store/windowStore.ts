import { create } from "zustand";
import type { WindowInstance, WindowType } from "../types/window";
import { DESKTOP_APPS } from "../constants/apps";
import { useProcessStore } from "./processStore";


interface WindowStore {
  windows: WindowInstance[];

  openWindow: (type: WindowType, title?: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;

  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, width: number, height: number) => void;
  restoreWindow: (id: string) => void;
  AddToDock: (type: WindowType) => void;
  RemoveFromDock: (type: WindowType) => void;
  cleanupTerminatedProcesses: () => void;
}

let zCounter = 1;

export const useWindowStore = create<WindowStore>((set) => ({
  windows: [],

  openWindow: (type: WindowType) => {
    const pid = useProcessStore.getState().spawnProcess(type);

    set((state) => {
      const windowId = crypto.randomUUID();

      useProcessStore
        .getState()
        .attachWindow(pid, windowId);

      return {
        windows: [
          ...state.windows,
          {
            id: windowId,
            pid,
            type,
            title: type,
            isOpen: true,
            isMinimized: false,
            inDock: true,
            zIndex: zCounter++,
            position: { x: 120, y: 120 },
            size: { width: 600, height: 450 },
            icon: DESKTOP_APPS.find(app => app.id === type)?.icon!,
          },
        ],
      };
    });
  },

  closeWindow: (id) =>
    set((state) => {
      const win = state.windows.find(w => w.id === id);
      if (!win) return state;

      const remaining = state.windows.filter(
        w => w.pid === win.pid && w.id !== id && w.isOpen
      );

      if (remaining.length === 0) {
        useProcessStore.getState().killProcess(win.pid);
      }

      return {
        windows: state.windows.map(w =>
          w.id === id ? { ...w, isOpen: false } : w
        ),
      };
    }),


  minimizeWindow: (id) =>
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id
          ? { ...w, isMinimized: true }
          : w
      ),
    })),


  focusWindow: (id) =>
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: zCounter++ } : w
      ),
    })),

  moveWindow: (id, x, y) =>
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id
          ? { ...w, position: { x, y } }
          : w
      ),
    })),

  resizeWindow: (id, width, height) =>
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id
          ? { ...w, size: { width, height } }
          : w
      ),
    })),
  restoreWindow: (id) =>
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id
          ? { ...w, isOpen: true, isMinimized: false, zIndex: zCounter++ }
          : w
      ),
    })),

  AddToDock: (type: WindowType) =>
    set((state) => {
      const pid = useProcessStore.getState().spawnProcess(type);
      const existing = state.windows.find(w => w.type === type);

      if (existing) {
        return {
          windows: state.windows.map(w =>
            w.type === type ? { ...w, inDock: true } : w
          ),
        };
      }

      // Create dock-only entry
      const app = DESKTOP_APPS.find(a => a.id === type);

      if (!app) return state;

      return {
        windows: [
          ...state.windows,
          {
            id: crypto.randomUUID(),
            pid,
            type,
            title: app.label,
            isOpen: false,
            isMinimized: false,
            zIndex: 0,
            position: { x: 0, y: 0 },
            size: { width: 480, height: 320 },
            inDock: true,
            icon: app.icon,
          },
        ],
      };
    }),


  RemoveFromDock: (type: WindowType) =>
    set((state) => ({
      windows: state.windows.filter(w =>
        !(w.type === type && w.inDock === true)
      ),
    })),
  cleanupTerminatedProcesses: () =>
    set(state => ({
      windows: state.windows.filter(w => {
        const proc = useProcessStore
          .getState()
          .processes
          .find(p => p.pid === w.pid);

        return proc?.state !== "terminated";
      }),
    })),

}));
