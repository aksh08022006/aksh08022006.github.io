"use client";

import { useEffect, useMemo, useState } from "react";

interface CodeforcesSubmission {
  id: number;
  creationTimeSeconds: number;
}

interface CodeforcesResponse {
  status: "OK" | "FAILED";
  result?: CodeforcesSubmission[];
  comment?: string;
}

const DAY = 86_400_000;
const CELL_COUNT = 53 * 7;

function dateKey(timestamp: number) {
  return new Date(timestamp).toISOString().slice(0, 10);
}

function buildCalendar(submissions: CodeforcesSubmission[]) {
  const now = new Date();
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const end = today + (6 - new Date(today).getUTCDay()) * DAY;
  const start = end - (CELL_COUNT - 1) * DAY;
  const counts = new Map<string, number>();

  for (const submission of submissions) {
    const timestamp = submission.creationTimeSeconds * 1000;
    if (timestamp < start || timestamp > today + DAY) continue;
    const key = dateKey(timestamp);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const maxCount = Math.max(1, ...counts.values());
  const cells = Array.from({ length: CELL_COUNT }, (_, index) => {
    const date = start + index * DAY;
    const key = dateKey(date);
    const count = counts.get(key) ?? 0;
    const level = count === 0 ? 0 : Math.max(1, Math.ceil((count / maxCount) * 4));
    return { key, count, level, future: date > today };
  });

  return {
    cells,
    total: [...counts.values()].reduce((sum, count) => sum + count, 0),
    activeDays: counts.size,
  };
}

const loadingCells = Array.from({ length: CELL_COUNT }, (_, index) => ({
  key: `loading-${index}`,
  level: index % 29 === 0 ? 1 : 0,
}));

export default function CodeforcesHeatmap({ handle }: { handle: string }) {
  const [submissions, setSubmissions] = useState<CodeforcesSubmission[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const url = `https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=1&count=10000`;

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Codeforces returned ${response.status}`);
        return response.json() as Promise<CodeforcesResponse>;
      })
      .then((payload) => {
        if (payload.status !== "OK" || !payload.result) {
          throw new Error(payload.comment ?? "Codeforces activity is unavailable");
        }
        setSubmissions(payload.result);
      })
      .catch((error: Error) => {
        if (error.name !== "AbortError") setFailed(true);
      });

    return () => controller.abort();
  }, [handle]);

  const calendar = useMemo(
    () => (submissions ? buildCalendar(submissions) : null),
    [submissions],
  );

  if (failed) {
    return (
      <div className="activity-fetch-state" role="status">
        Live activity is temporarily unavailable. The profile link still works.
      </div>
    );
  }

  const cells = calendar?.cells ?? loadingCells;

  return (
    <div aria-busy={!calendar} aria-live="polite">
      <div
        className={`activity-calendar ${calendar ? "" : "is-loading"}`}
        role="img"
        aria-label={`Codeforces submission heatmap for ${handle}`}
      >
        {cells.map((cell) => (
          <span
            key={cell.key}
            data-level={cell.level}
            data-future={"future" in cell && cell.future ? "true" : undefined}
            title={"count" in cell ? `${cell.key}: ${cell.count} submissions` : undefined}
          />
        ))}
      </div>

      <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-faint">
        {calendar
          ? `${calendar.total} submissions · ${calendar.activeDays} active ${calendar.activeDays === 1 ? "day" : "days"} in the last 12 months`
          : "Loading submission activity…"}
      </p>
    </div>
  );
}
