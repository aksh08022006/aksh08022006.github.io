import { contact, profile } from "@/lib/content";

const year = 2026;

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8 sm:py-28">
        <p data-reveal className="eyebrow">
          Contact
        </p>
        <h2
          data-reveal
          className="mt-7 font-serif text-[clamp(2.4rem,7vw,4.5rem)] leading-[1] tracking-tight"
        >
          {contact.heading}
        </h2>
        <p data-reveal className="mt-6 max-w-md text-lg leading-relaxed text-muted">
          {contact.sub}
        </p>

        <a
          data-reveal
          href={`mailto:${profile.email}`}
          className="tlink mt-9 inline-flex items-center gap-2 font-serif text-2xl sm:text-3xl"
        >
          {profile.email}
          <span aria-hidden className="text-accent">
            ↗
          </span>
        </a>

        <div data-reveal className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="tlink text-sm font-medium"
          >
            GitHub ↗
          </a>
          <span className="text-sm text-faint">@{profile.githubHandle}</span>
        </div>
      </div>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-6 py-7 text-sm text-faint sm:px-8">
          <span>
            © {year} {profile.name}
          </span>
          <a href="#top" className="tlink">
            Back to top ↑
          </a>
        </div>
      </footer>
    </section>
  );
}
