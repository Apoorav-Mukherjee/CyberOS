import { create } from 'zustand';

export type ContextMenuType = 'desktop-app' | 'dock-app' | 'window' | null;

interface ContextMenuState {
  isOpen: boolean;
  type: ContextMenuType;
  position: { x: number; y: number };
  payload?: any;

  openMenu: (
    type: ContextMenuType,
    position: { x: number; y: number },
    payload?: any
  ) => void; 

  closeMenu: () => void;
}

export const useContextMenuStore = create<ContextMenuState>(set => ({
  isOpen: false,
  type: null,
  position: { x: 0, y: 0 },
  payload: null,

  openMenu: (type, position, payload) =>
    set({
      isOpen: true,
      type,
      position,
      payload,
    }),

  closeMenu: () =>
    set({
      isOpen: false,
      type: null,
      payload: null,
    }),
}));
