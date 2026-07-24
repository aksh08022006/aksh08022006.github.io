import { projects, type Project, type ProjectStatus } from "@/lib/projects";
import { work } from "@/lib/content";

const statusColor: Record<ProjectStatus, string> = {
  Live: "#3f9b6d",
  Complete: "#3f9b6d",
  "Open source": "#3f9b6d",
  Research: "#c98a3a",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <article data-reveal className="project-card grid gap-5 py-8 sm:grid-cols-[3rem_1fr] sm:py-10">
      <span className="work-index pt-1">{project.id}</span>

      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="font-serif text-3xl leading-none tracking-tight sm:text-4xl">
            {project.name}
          </h3>

          <span className="flex shrink-0 items-center gap-2 pt-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: statusColor[project.status] }}
            />
            <span className="eyebrow">{project.status}</span>
          </span>
        </div>

        <p className="mt-4 max-w-2xl leading-relaxed text-muted">{project.description}</p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
            {project.tags.map((tag) => (
              <li key={tag} className="project-tag">
                {tag}
              </li>
            ))}
          </ul>

          <div className="flex gap-4">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="tlink text-sm font-medium"
                aria-label={`${project.name} ${link.label.toLowerCase()} (opens in a new tab)`}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-4xl px-6 py-24 sm:px-8 sm:py-28">
      <div data-reveal className="flex items-end justify-between gap-6 border-b border-line pb-5">
        <div>
          <h2 className="eyebrow">{work.heading}</h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">{work.intro}</p>
        </div>
        <span className="eyebrow hidden sm:block">
          Selected / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <div className="divide-y divide-line">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <a
        data-reveal
        href={work.more.href}
        target="_blank"
        rel="noopener noreferrer"
        className="tlink mt-8 inline-block text-sm font-medium"
      >
        {work.more.label} ↗
      </a>
    </section>
  );
}
