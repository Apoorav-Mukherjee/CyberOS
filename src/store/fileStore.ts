import { create } from "zustand";

export type FileNode = {
  id: string;
  name: string;
  type: "file" | "folder";
  content?: string;
  children?: FileNode[];
};

interface FileStore {
  root: FileNode;
  currentPath: string[];
  openFile: FileNode | null;

  openFolder: (name: string) => void;
  goBack: () => void;
  selectFile: (file: FileNode) => void;
}

const initialFS: FileNode = {
  id: "root",
  name: "root",
  type: "folder",
  children: [
    {
      id: "docs",
      name: "Documents",
      type: "folder",
      children: [
        {
          id: "readme",
          name: "readme.txt",
          type: "file",
          content: "Welcome to CyberOS Files.\nThis is a virtual file system.",
        },
      ],
    },
    {
      id: "projects",
      name: "Projects",
      type: "folder",
      children: [],
    },
  ],
};

export const useFileStore = create<FileStore>((set) => ({
  root: initialFS,
  currentPath: [],
  openFile: null,

  openFolder: (name) => {
    set((state) => ({
      currentPath: [...state.currentPath, name],
      openFile: null,
    }));
  },

  goBack: () => {
    set((state) => ({
      currentPath: state.currentPath.slice(0, -1),
      openFile: null,
    }));
  },

  selectFile: (file) => {
    set(() => ({ openFile: file }));
  },
}));
