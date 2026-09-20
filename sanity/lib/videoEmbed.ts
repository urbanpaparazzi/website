export type VideoPlatform =
  | "youtube"
  | "youtube-shorts"
  | "instagram"
  | "tiktok"
  | "facebook"
  | "twitter"
  | "generic";

export interface DetectedVideo {
  platform: VideoPlatform;
  /** iframe-embeddable URL, only set for platforms we can embed directly. */
  embedUrl?: string;
  /** Best-guess natural orientation for platforms with a fixed aspect ratio. */
  orientation?: "landscape" | "portrait";
}

/**
 * Detects the source platform of a pasted video URL (YouTube, YouTube
 * Shorts, Instagram, TikTok, Facebook, X/Twitter) and, where possible,
 * returns a ready-to-embed URL. Falls back to "generic" (rendered as a
 * link-out card) for anything unrecognized.
 */
export function detectVideoPlatform(url?: string | null): DetectedVideo {
  if (!url) return { platform: "generic" };

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { platform: "generic" };
  }

  const host = parsed.hostname.replace(/^www\./, "");

  // YouTube Shorts
  const shortsMatch = parsed.pathname.match(/\/shorts\/([\w-]+)/);
  if (host.includes("youtube.com") && shortsMatch) {
    return {
      platform: "youtube-shorts",
      embedUrl: `https://www.youtube.com/embed/${shortsMatch[1]}`,
      orientation: "portrait",
    };
  }

  // Standard YouTube (watch?v=, youtu.be/, embed/)
  if (host === "youtu.be") {
    const id = parsed.pathname.slice(1);
    if (id) {
      return {
        platform: "youtube",
        embedUrl: `https://www.youtube.com/embed/${id}`,
        orientation: "landscape",
      };
    }
  }
  if (host.includes("youtube.com")) {
    const id =
      parsed.searchParams.get("v") ??
      parsed.pathname.match(/\/embed\/([\w-]+)/)?.[1];
    if (id) {
      return {
        platform: "youtube",
        embedUrl: `https://www.youtube.com/embed/${id}`,
        orientation: "landscape",
      };
    }
  }

  if (host.includes("instagram.com")) {
    return { platform: "instagram", orientation: "portrait" };
  }

  if (host.includes("tiktok.com")) {
    return { platform: "tiktok", orientation: "portrait" };
  }

  if (host.includes("facebook.com") || host.includes("fb.watch")) {
    return {
      platform: "facebook",
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        url,
      )}&show_text=0`,
    };
  }

  if (host.includes("twitter.com") || host.includes("x.com")) {
    return { platform: "twitter" };
  }

  return { platform: "generic" };
}
