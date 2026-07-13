"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const INTERACTIVE = "a, button, [data-cursor]";

// A single accent dot that follows the pointer and gently grows over interactive
// elements. Fine-pointer devices only; reduced-motion users keep the native cursor.
export default function Cursor() {
  const layer = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const mm = gsap.matchMedia();
      const safe = contextSafe!;

      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const html = document.documentElement;
          html.classList.add("has-cursor");

          gsap.set(dot.current, { xPercent: -50, yPercent: -50 });

          const xTo = gsap.quickTo(dot.current, "x", { duration: 0.16, ease: "power3" });
          const yTo = gsap.quickTo(dot.current, "y", { duration: 0.16, ease: "power3" });

          let shown = false;
          const move = safe((event: PointerEvent) => {
            xTo(event.clientX);
            yTo(event.clientY);
            if (!shown) {
              shown = true;
              gsap.to(layer.current, { autoAlpha: 1, duration: 0.18 });
            }
          });

          const over = safe((event: PointerEvent) => {
            const hit = (event.target as Element)?.closest?.(INTERACTIVE);
            gsap.to(dot.current, {
              scale: hit ? 1.8 : 1,
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            });
          });

          const down = safe(() => {
            gsap.to(dot.current, { scale: 0.72, duration: 0.1, overwrite: "auto" });
          });

          const up = safe(() => {
            gsap.to(dot.current, { scale: 1, duration: 0.18, overwrite: "auto" });
          });

          const leave = safe(() => {
            shown = false;
            gsap.to(layer.current, { autoAlpha: 0, duration: 0.18 });
          });

          window.addEventListener("pointermove", move, { passive: true });
          document.addEventListener("pointerover", over, { passive: true });
          document.addEventListener("pointerdown", down, { passive: true });
          document.addEventListener("pointerup", up, { passive: true });
          document.addEventListener("pointerleave", leave);

          return () => {
            html.classList.remove("has-cursor");
            window.removeEventListener("pointermove", move);
            document.removeEventListener("pointerover", over);
            document.removeEventListener("pointerdown", down);
            document.removeEventListener("pointerup", up);
            document.removeEventListener("pointerleave", leave);
          };
        },
      );

      return () => mm.revert();
    },
    { scope: layer },
  );

  return (
    <div ref={layer} className="cursor-layer" aria-hidden>
      <div ref={dot} className="cursor-dot" />
    </div>
  );
}
