"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register once, on the client. useGSAP handles automatic cleanup.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Single client boundary for the page. Section components are passed in as
// `children` and stay Server Components — this file just animates the DOM they
// produce. Content is visible without JS; [data-hero]/[data-hero-title]/[data-reveal]
// are hidden by CSS only when `html.js` is set, so GSAP can reveal without a flash.
export default function Motion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          animate: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (self) => {
          const scope = root.current!;
          const q = gsap.utils.selector(scope);

          // Scroll-progress bar — fine in every mode.
          gsap.fromTo(
            q("[data-progress]"),
            { scaleX: 0 },
            { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
          );

          // Reduced motion: just reveal everything, no transitions.
          if (self.conditions?.reduce) {
            gsap.set(q("[data-hero], [data-hero-title], [data-reveal]"), {
              autoAlpha: 1,
              y: 0,
            });
            return;
          }

          // Header slides down (no opacity → never flashes).
          gsap.from(q("[data-header]"), { y: -24, duration: 0.9, ease: "power3.out" });

          // Hero title: line-by-line masked reveal. autoSplit re-splits on font
          // load / resize; we only animate the first split.
          const title = scope.querySelector<HTMLElement>("[data-hero-title]");
          if (title) {
            gsap.set(title, { autoAlpha: 1 }); // clear CSS guard; mask hides the lines
            let played = false;
            SplitText.create(title, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit(s) {
                if (played) {
                  gsap.set(s.lines, { yPercent: 0 });
                  return;
                }
                played = true;
                return gsap.from(s.lines, {
                  yPercent: 110,
                  duration: 1.1,
                  ease: "power4.out",
                  stagger: 0.13,
                  delay: 0.1,
                });
              },
            });
          }

          // Hero supporting items: staggered entrance.
          gsap.set(q("[data-hero]"), { autoAlpha: 0, y: 24 });
          gsap
            .timeline()
            .to(
              q("[data-hero]"),
              { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 },
              0.25,
            );

          // Scroll reveals, batched so items entering together share a stagger.
          gsap.set(q("[data-reveal]"), { autoAlpha: 0, y: 26 });
          ScrollTrigger.batch(q("[data-reveal]"), {
            start: "top 88%",
            once: true,
            onEnter: (els) =>
              gsap.to(els, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
                overwrite: true,
              }),
          });
        },
        root,
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="contents">
      {children}
    </div>
  );
}
