import type { WindowType } from "../types/window";

import {
    User,
    Code2,
    FolderGit2,
    Terminal,
    Mail,
    Grid
} from "lucide-react";

import type {
    LucideIcon
} from "lucide-react";

export const DESKTOP_APPS: {
    id: WindowType;
    label: string; 
    icon: LucideIcon;
}[] = [
        { 
            id: "contact", 
            label: "Contact.net",
            icon: Mail 
        },

        { 
            id: "about", 
            label: "About.exe",
            icon: User
        },
        { 
            id: "skills", 
            label: "Skills.sys",
            icon: Code2
        },
        { 
            id: "terminal", 
            label: "Terminal",
            icon: Terminal
        },
        { 
            id: "apps", 
            label: "Apps.exe",
            icon: Grid
        },
        { 
            id: "projects", 
            label: "Projects.zip",
            icon: FolderGit2
        },
    ];
