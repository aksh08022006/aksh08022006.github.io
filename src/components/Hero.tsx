import { hero, profile } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[88vh] max-w-3xl flex-col justify-center px-6 pb-24 pt-24 sm:px-8"
    >
      <div data-hero-group>
        <p data-hero className="eyebrow">
          {hero.eyebrow}
        </p>

        {/* SplitText reveals this line by line; renders as plain text without JS */}
        <h1
          data-hero-title
          className="mt-7 font-serif text-[clamp(2.8rem,9vw,5.5rem)] font-normal leading-[1] tracking-[-0.02em]"
        >
          {hero.headline}
        </h1>

        <p data-hero className="mt-7 max-w-md text-lg leading-relaxed text-muted">
          {hero.sub}
        </p>

        {profile.available && (
          <p data-hero className="mt-8 flex items-center gap-2 text-sm text-muted">
            <span className="status-dot" />
            Available for new work
          </p>
        )}
      </div>

      <div
        data-hero
        className="pointer-events-none absolute bottom-10 left-6 flex items-center gap-3 sm:left-8"
      >
        <span className="scroll-cue" />
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-faint">
          Scroll
        </span>
      </div>
    </section>
  );
}
