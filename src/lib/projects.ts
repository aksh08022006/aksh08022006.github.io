export type ProjectStatus = "Live" | "Open source" | "In progress" | "Coming soon";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  href?: string;
}

// Featured work — names only, in order of attention. Everything else is on GitHub.
export const projects: Project[] = [
  {
    id: "01",
    name: "GLOB",
    status: "Live",
    href: "https://ai.studio/apps/drive/10gBDPdhIJ-5c7AqjrVM1ZgcUsXTzENKL",
  },
  { id: "02", name: "EvoComb", status: "In progress" },
  { id: "03", name: "ISRO project", status: "In progress" },
  { id: "04", name: "CA-OS", status: "In progress" },
  { id: "05", name: "Football predictor", status: "In progress" },
];
