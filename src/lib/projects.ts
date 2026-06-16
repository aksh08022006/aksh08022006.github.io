export type ProjectStatus = "Live" | "Complete" | "Open source" | "In progress" | "Coming soon";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  href?: string;
}

// Featured work — names only, in order of attention. Everything else is on GitHub.
export const projects: Project[] = [
  { id: "01", name: "GLOB", status: "Live", href: "https://glob.akshh.workers.dev/" },
  { id: "02", name: "EvoComb", status: "Live", href: "https://evo-comb-web.vercel.app/" },
  {
    id: "03",
    name: "ISRO project",
    status: "In progress",
    href: "https://github.com/aksh08022006/vayu-aqi-hcho",
  },
  { id: "04", name: "CA-OS", status: "Complete" },
  { id: "05", name: "Football predictor", status: "Complete" },
];
