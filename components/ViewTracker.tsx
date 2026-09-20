"use client";

import { useEffect } from "react";

interface ViewTrackerProps {
  type: "video" | "news";
  slug: string;
}

const ENDPOINT: Record<ViewTrackerProps["type"], string> = {
  video: "/api/videos",
  news: "/api/news",
};

// Fires a single view-count increment per browser session per document,
// guarded by sessionStorage so refreshes/re-renders don't inflate counts.
export default function ViewTracker({ type, slug }: ViewTrackerProps) {
  useEffect(() => {
    const key = `viewed:${type}:${slug}`;
    if (sessionStorage.getItem(key)) return;

    sessionStorage.setItem(key, "1");
    fetch(`${ENDPOINT[type]}/${slug}/view`, { method: "POST" }).catch(() => {
      sessionStorage.removeItem(key);
    });
  }, [type, slug]);

  return null;
}
