import type { WindowType } from "./window";

export interface Process {
  pid: number;
  appType: WindowType;
  windows: string[]; // window IDs
  startedAt: number;
  state: "running" | "sleeping" | "terminated";
}
