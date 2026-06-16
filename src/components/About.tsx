import { about } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="border-t border-line bg-paper-2/40">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8 sm:py-28">
        <p data-reveal className="eyebrow">
          About
        </p>
        <p
          data-reveal
          className="mt-7 font-serif text-[clamp(1.7rem,3.6vw,2.5rem)] leading-snug tracking-tight"
        >
          {about.lead}
        </p>
        <p data-reveal className="mt-6 max-w-xl leading-relaxed text-muted">
          {about.body}
        </p>

        <ul data-reveal className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {about.focus.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-ink">
              <span className="h-px w-4 bg-accent" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
