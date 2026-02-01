import { create } from "zustand";
import type { WindowInstance, WindowType } from "../types/window";
import { DESKTOP_APPS } from "../constants/apps";


interface WindowStore {
  windows: WindowInstance[];

  openWindow: (type: WindowType, title?: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;

  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, width: number, height: number) => void;
  restoreWindow: (id: string) => void;
  AddToDock: (id: string) => void;
  RemoveFromDock: (id: string) => void;
}

let zCounter = 1;

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],

  openWindow: (type, title) => {
    const existing = get().windows.find(w => w.type === type);

    if (existing) {
      set(state => ({
        windows: state.windows.map(w =>
          w.id === existing.id
            ? { ...w, isMinimized: false, zIndex: zCounter++ }
            : w
        ),
      }));
      return;
    }

    const id = crypto.randomUUID();

    set(state => ({
      windows: [
        ...state.windows,
        {
          id,
          type,
          title: title || "",
          isOpen: true,
          isMinimized: false,
          zIndex: zCounter++,
          position: { x: 200, y: 120 },
          size: { width: 480, height: 320 },
          inDock: true,
          icon: DESKTOP_APPS.find(app => app.id === type)?.icon!,
        },
      ],
    }));
  },

  closeWindow: (id) =>
    set(state => ({
      windows: state.windows.filter(w => w.id !== id),
    })),

  minimizeWindow: (id) =>
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id
          ? { ...w, isMinimized: !w.isMinimized }
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
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id
          ? { ...w, isMinimized: false, isOpen: true }
          : w
      ),
    })),
  AddToDock: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, inDock: true } : w
      ),
    })),
  RemoveFromDock: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, inDock: false } : w
      ),
    })),

}));
