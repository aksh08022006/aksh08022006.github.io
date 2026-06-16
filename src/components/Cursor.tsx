"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const INTERACTIVE = "a, button, [data-cursor]";

// A precise dot + a softly trailing ring. The ring uses mix-blend: difference so
// it reads on any background; it grows over links/projects. Pointer devices only,
// and disabled under prefers-reduced-motion (native cursor stays).
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const html = document.documentElement;
        html.classList.add("has-cursor"); // hides the native cursor

        gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50 });

        const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
        const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
        const rx = gsap.quickTo(ring.current, "x", { duration: 0.4, ease: "power3" });
        const ry = gsap.quickTo(ring.current, "y", { duration: 0.4, ease: "power3" });

        let shown = false;
        const move = (e: PointerEvent) => {
          dx(e.clientX);
          dy(e.clientY);
          rx(e.clientX);
          ry(e.clientY);
          if (!shown) {
            shown = true;
            gsap.to(layer.current, { autoAlpha: 1, duration: 0.3 });
          }
        };

        const over = (e: PointerEvent) => {
          const hit = (e.target as Element)?.closest?.(INTERACTIVE);
          gsap.to(ring.current, {
            scale: hit ? 1.9 : 1,
            duration: 0.3,
            ease: "power3",
            overwrite: "auto",
          });
          gsap.to(dot.current, {
            scale: hit ? 0 : 1,
            duration: 0.3,
            ease: "power3",
            overwrite: "auto",
          });
        };

        const leave = () => gsap.to(layer.current, { autoAlpha: 0, duration: 0.25 });

        window.addEventListener("pointermove", move);
        document.addEventListener("pointerover", over);
        document.addEventListener("pointerleave", leave);

        return () => {
          html.classList.remove("has-cursor");
          window.removeEventListener("pointermove", move);
          document.removeEventListener("pointerover", over);
          document.removeEventListener("pointerleave", leave);
        };
      },
    );

    return () => mm.revert();
  });

  return (
    <div ref={layer} className="cursor-layer" aria-hidden>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </div>
  );
}
