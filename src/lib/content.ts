// ─────────────────────────────────────────────────────────────
// Single source of truth for site copy. Edit here — components read from this.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Aksh Kaushik",
  available: true,
  email: "aksh.heisenberg@gmail.com",
  github: "https://github.com/aksh08022006",
  githubHandle: "aksh08022006",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Blog", href: "#blog" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  eyebrow: "Aksh Kaushik",
  // Big headline; SplitText reveals it line by line. Renders as plain text without JS.
  headline: "I'm Aksh. I build things.",
  sub: "Then I take them apart to see how they work. Mostly ML systems and agents.",
};

export const work = {
  heading: "Work",
  more: { label: "More on GitHub", href: "https://github.com/aksh08022006" },
};

export const blog = {
  heading: "Blog",
  status: "Coming soon",
  note: "Notes on what I’m building and breaking — once I get around to writing them.",
};

export const about = {
  lead: "I build things, take them apart to see how they work, and try to learn something new every day.",
  body: "I’d rather ship something small and real than talk about something big and vague. Always happy to learn from people who know more than me.",
  focus: ["Agents & LLMs", "Applied ML", "Systems & data"],
};

export const contact = {
  heading: "Get in touch.",
  sub: "Email’s the best way to reach me.",
};
