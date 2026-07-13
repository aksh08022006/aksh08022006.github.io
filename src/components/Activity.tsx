import Image from "next/image";
import CodeforcesHeatmap from "@/components/CodeforcesHeatmap";
import { activity } from "@/lib/content";

type ActivityProfile = (typeof activity.profiles)[keyof typeof activity.profiles];

const placeholderLevels = Array.from({ length: 91 }, (_, index) => {
  if (index % 19 === 0 || index % 23 === 0) return 3;
  if (index % 11 === 0 || index % 17 === 0) return 2;
  if (index % 5 === 0) return 1;
  return 0;
});

function PlaceholderHeatmap() {
  return (
    <div className="activity-placeholder" aria-hidden>
      <div className="activity-grid">
        {placeholderLevels.map((level, index) => (
          <span key={index} data-level={level} />
        ))}
      </div>
      <span className="activity-placeholder-label">Profile handle needed</span>
    </div>
  );
}

function ActivityCard({ profile }: { profile: ActivityProfile }) {
  const connected = Boolean(profile.handle && profile.heatmap);
  const isCodeforces = profile.label === "Codeforces" && Boolean(profile.handle);
  const isLeetCode = profile.label === "LeetCode";

  return (
    <article data-reveal className="activity-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl tracking-tight">{profile.label}</h3>
          <p className="mt-1 font-mono text-xs text-faint">
            {profile.handle ? `@${profile.handle}` : "Not connected yet"}
          </p>
        </div>

        {profile.handle ? (
          <a
            href={profile.href}
            target="_blank"
            rel="noopener noreferrer"
            className="tlink text-sm font-medium"
            aria-label={`${profile.label} profile (opens in a new tab)`}
          >
            Profile ↗
          </a>
        ) : (
          <span className="eyebrow">Awaiting handle</span>
        )}
      </div>

      <div className={`activity-visual ${isLeetCode ? "is-leetcode" : ""}`}>
        {isCodeforces ? (
          <div className="activity-image-wrap">
            <CodeforcesHeatmap handle={profile.handle} />
          </div>
        ) : connected ? (
          <div className="activity-image-wrap">
            <Image
              src={profile.heatmap}
              alt={`${profile.label} contribution heatmap for ${profile.handle}`}
              width={profile.width}
              height={profile.height}
              unoptimized
              sizes="(max-width: 767px) calc(100vw - 5rem), 420px"
              className="activity-profile-image"
            />
          </div>
        ) : (
          <PlaceholderHeatmap />
        )}
      </div>
    </article>
  );
}

export default function Activity() {
  return (
    <section id="activity" className="border-y border-line bg-paper-2/40">
      <div className="mx-auto max-w-4xl px-6 py-24 sm:px-8 sm:py-28">
        <div data-reveal className="max-w-xl">
          <h2 className="eyebrow">{activity.heading}</h2>
          <p className="mt-4 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            {activity.intro}
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          <ActivityCard profile={activity.profiles.github} />
          <ActivityCard profile={activity.profiles.leetcode} />
          <ActivityCard profile={activity.profiles.codeforces} />
        </div>
      </div>
    </section>
  );
}
