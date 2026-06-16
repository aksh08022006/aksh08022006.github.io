import { nav, profile } from "@/lib/content";

export default function Header() {
  return (
    <>
      {/* scroll-progress bar — scaleX driven by GSAP in Motion */}
      <div className="progress-track" aria-hidden>
        <div className="progress-bar" data-progress />
      </div>

      <header
        data-header
        className="sticky top-0 z-40 border-b border-line/70 bg-paper/70 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6 sm:px-8">
          <a href="#top" className="font-serif text-xl leading-none tracking-tight">
            {profile.name}
          </a>
          <nav className="flex items-center gap-5 sm:gap-7">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
