import { create } from "zustand";

export type Skill = {
  id: string;
  name: string;
  category: string;
  level: number; // 1–5
  experience: string;
  notes?: string;
};

interface SkillsStore {
  skills: Skill[];
}

export const useSkillsStore = create<SkillsStore>(() => ({
  skills: [
    {
      id: crypto.randomUUID(),
      name: "React",
      category: "Frontend",
      level: 5,
      experience: "2+ years",
      notes: "Hooks, Zustand, performance",
    },
    {
      id: crypto.randomUUID(),
      name: "TypeScript",
      category: "Language",
      level: 4,
      experience: "1.5+ years",
    },
    {
      id: crypto.randomUUID(),
      name: "Node.js",
      category: "Backend",
      level: 4,
      experience: "1+ year",
    },
    {
      id: crypto.randomUUID(),
      name: "Linux",
      category: "OS",
      level: 3,
      experience: "Daily usage",
    },
  ],
}));
