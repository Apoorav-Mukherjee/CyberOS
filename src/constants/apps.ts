import TerminalComponent from "../components/Terminal";
import TaskManager from "../components/TaskManager";
import ContactApp from "../components/contact/ContactApp";
import AboutApp from "../components/about/AboutApp";
import FilesApp from "../components/files/FilesApp";

import {
    User,
    // Code2,
    FolderIcon,
    Terminal,
    Mail,
    // Grid,
    ActivityIcon,
} from "lucide-react";

export type AppId =
    | "about"
    | "skills"
    | "projects"
    | "terminal"
    | "contact"
    | "apps"
    | "task-manager";

export interface AppDefinition {
    id: AppId;
    label: string;
    icon: React.ComponentType<any>;
    component: React.ComponentType;
    singleton?: boolean; // If true, only one instance can be opened
}

export const DESKTOP_APPS: AppDefinition[] = [
    {
        id: "terminal",
        label: "Terminal",
        icon: Terminal,
        component: TerminalComponent,
    },

    {
        id: "task-manager",
        label: "Task Manager",
        icon: ActivityIcon, // any icon you use
        component: TaskManager,
    },
    { 
        id: "about", 
        label: "About.exe",
        icon: User,
        component: AboutApp,
        singleton: true,
    },

    { 
        id: "contact", 
        label: "Contact.mail",
        icon: Mail,
        component: ContactApp,
        singleton: true,
    },

    // { 
    //     id: "skills", 
    //     label: "Skills.sys",
    //     icon: Code2,
    //     component: SkillsComponent,
    // },

    { 
        id: "apps", 
        label: "Apps.exe",
        icon: FolderIcon,
        component: FilesApp,
        singleton: true,
    },
    // { 
    //     id: "projects", 
    //     label: "Projects.zip",
    //     icon: FolderGit2,
    //     component: ProjectsComponent,
    // },
];
