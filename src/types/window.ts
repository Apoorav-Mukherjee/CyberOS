import { DESKTOP_APPS } from "../constants/apps";

export type WindowType =
  | 'about'
  | 'skills'
  | 'projects'
  | 'terminal'
  | 'contact'
  | 'apps'
  | 'task-manager'
  ;

export interface WindowInstance {
  id: string;
  pid: number;   
  type: WindowType;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  inDock: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  icon: typeof DESKTOP_APPS[number]['icon'];
  restoreFromDock?: boolean;
  minimizing?: boolean;
}