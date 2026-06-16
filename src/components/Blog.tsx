import { blog } from "@/lib/content";

export default function Blog() {
  return (
    <section id="blog" className="border-t border-line">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8 sm:py-28">
        <div data-reveal className="flex items-baseline gap-3">
          <h2 className="eyebrow">{blog.heading}</h2>
          <span className="eyebrow text-faint">— {blog.status}</span>
        </div>
        <p
          data-reveal
          className="mt-7 max-w-md font-serif text-[clamp(1.6rem,3.4vw,2.2rem)] leading-snug tracking-tight text-muted"
        >
          {blog.note}
        </p>
      </div>
    </section>
  );
}
