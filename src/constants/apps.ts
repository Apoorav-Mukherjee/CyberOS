import TerminalComponent from "../components/Terminal";


import {
    // User,
    // Code2,
    // FolderGit2,
    Terminal,
    // Mail,
    // Grid
} from "lucide-react";

export type AppId =
  | "about"
  | "skills"
  | "projects"
  | "terminal"
  | "contact"
  | "apps";

export interface AppDefinition {
  id: AppId;
  label: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType;
}

export const DESKTOP_APPS: AppDefinition[] = [
    {
        id: "terminal",
        label: "Terminal",
        icon: Terminal,
        component: TerminalComponent,
    },
    // { 
    //     id: "about", 
    //     label: "About.exe",
    //     icon: User,
    //     component: AboutComponent,
    // },
    // { 
    //     id: "skills", 
    //     label: "Skills.sys",
    //     icon: Code2,
    //     component: SkillsComponent,
    // },
    // { 
    //     id: "contact", 
    //     label: "Contact.exe",
    //     icon: Mail,
    //     component: ContactComponent,
    // },
    // { 
    //     id: "apps", 
    //     label: "Apps.exe",
    //     icon: Grid,
    //     component: AppsComponent,
    // },
    // { 
    //     id: "projects", 
    //     label: "Projects.zip",
    //     icon: FolderGit2,
    //     component: ProjectsComponent,
    // },
];
