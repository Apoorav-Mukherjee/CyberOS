export type WindowType =
  | 'about'
  | 'skills'
  | 'projects'
  | 'terminal'
  | 'contact'
  | 'apps';


export interface WindowInstance {
  id: string;
  type: WindowType;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}