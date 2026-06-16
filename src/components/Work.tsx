import { projects, type Project, type ProjectStatus } from "@/lib/projects";
import { work } from "@/lib/content";

const statusColor: Record<ProjectStatus, string> = {
  Live: "#3f9b6d",
  "Open source": "#3f9b6d",
  "In progress": "#c98a3a",
  "Coming soon": "#97948a",
};

function Row({ project }: { project: Project }) {
  const inner = (
    <>
      <span className="work-index shrink-0">{project.id}</span>

      <h3 className="flex-1 font-serif text-3xl leading-none tracking-tight transition-colors group-hover:text-accent sm:text-5xl">
        {project.name}
      </h3>

      <span className="flex shrink-0 items-center gap-2">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: statusColor[project.status] }}
        />
        <span className="eyebrow hidden sm:inline">{project.status}</span>
      </span>

      {project.href && (
        <span className="shrink-0 text-xl text-faint transition-colors group-hover:text-accent">
          ↗
        </span>
      )}
    </>
  );

  const cls = "work-row group flex items-center gap-4 px-3 py-6 sm:gap-6 sm:px-5";

  return project.href ? (
    <a
      data-reveal
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.name} (opens in a new tab)`}
      className={cls}
    >
      {inner}
    </a>
  ) : (
    <div data-reveal className={cls}>
      {inner}
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-3xl px-6 py-24 sm:px-8 sm:py-28">
      <h2 data-reveal className="eyebrow border-b border-line pb-5">
        {work.heading}
      </h2>

      <div className="mt-2 divide-y divide-line">
        {projects.map((p) => (
          <Row key={p.id} project={p} />
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
