export type ProjectStatus = "Live" | "Complete" | "Open source" | "Research";

export interface ProjectLink {
  label: "Live" | "Source";
  href: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  links: ProjectLink[];
}

// A deliberately curated set: shipped products and substantive original work.
// Forks, templates, coursework, and empty repositories stay on GitHub instead of
// competing for attention here.
export const projects: Project[] = [
  {
    id: "01",
    name: "GLOB",
    description:
      "A living spatial globe that turns photographs into memories you can revisit by place, time, and emotion.",
    status: "Live",
    tags: ["React", "WebGL", "Cloudflare"],
    links: [{ label: "Live", href: "https://glob.akshh.workers.dev/" }],
  },
  {
    id: "02",
    name: "EvoComb",
    description:
      "A transparent Environmental Stress Index for Delhi NCR, combining noise, crowding, heat, and air quality.",
    status: "Live",
    tags: ["Next.js", "Geospatial", "Data visualisation"],
    links: [{ label: "Live", href: "https://evo-comb-web.vercel.app/" }],
  },
  {
    id: "03",
    name: "VAYU",
    description:
      "Satellite-derived surface AQI and HCHO hotspot detection over India, with an honest spatial-validation pipeline.",
    status: "Research",
    tags: ["Python", "Remote sensing", "ML", "Next.js"],
    links: [
      { label: "Source", href: "https://github.com/aksh08022006/vayu-aqi-hcho" },
    ],
  },
  {
    id: "04",
    name: "Fraud detection pipeline",
    description:
      "A graph-attention and Transformer pipeline for transaction risk, exposed through an API and browser extension.",
    status: "Complete",
    tags: ["PyTorch", "GAT", "Transformer", "Flask"],
    links: [
      {
        label: "Source",
        href: "https://github.com/aksh08022006/Credit-Card-Fraud-Detection--GAT-Transformer-Pipeline",
      },
    ],
  },
  {
    id: "05",
    name: "Mifos AI Suite",
    description:
      "AI-assisted digitisation, report generation, and legacy-data migration tooling for the Mifos X ecosystem.",
    status: "Open source",
    tags: ["Python", "OCR", "Agents", "Fineract"],
    links: [
      { label: "Source", href: "https://github.com/aksh08022006/Mifos-Ai-Suite" },
    ],
  },
  {
    id: "06",
    name: "Wifly",
    description:
      "A Rust systems project focused on fast, memory-safe tooling and learning closer to the metal.",
    status: "Open source",
    tags: ["Rust", "Systems", "Networking"],
    links: [{ label: "Source", href: "https://github.com/aksh08022006/Wifly" }],
  },
  {
    id: "07",
    name: "Derivative risk management",
    description:
      "Quantitative analysis of futures pricing, margin simulation, and sensitivity for Indian equities.",
    status: "Complete",
    tags: ["Python", "Quant finance", "Jupyter"],
    links: [{ label: "Source", href: "https://github.com/aksh08022006/DRM_Project" }],
  },
  {
    id: "08",
    name: "BITS network keepalive",
    description:
      "A small, resilient authentication helper that keeps campus network sessions alive with observable logging.",
    status: "Open source",
    tags: ["Python", "Automation", "Networking"],
    links: [
      { label: "Source", href: "https://github.com/aksh08022006/BitsPilaniAuthScript" },
    ],
  },
];
