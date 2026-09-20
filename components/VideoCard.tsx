import Image from "next/image";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { urlFor } from "@/sanity/lib/image";

interface VideoCardCategory {
  _id: string;
  title: string;
  slug?: { current: string };
}

export interface VideoCardData {
  _id: string;
  title: string;
  slug: { current: string };
  thumbnail?: unknown;
  landscapeVideoUrl?: string | null;
  portraitVideoUrl?: string | null;
  primaryOrientation?: "landscape" | "portrait" | null;
  categories?: VideoCardCategory[];
  views?: number;
}

function formatViews(views?: number) {
  if (!views) return "0 views";
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`;
  return `${views} view${views === 1 ? "" : "s"}`;
}

export default function VideoCard({ video }: { video: VideoCardData }) {
  const isPortrait =
    video.primaryOrientation === "portrait" && video.portraitVideoUrl
      ? true
      : video.primaryOrientation !== "landscape" &&
        !video.landscapeVideoUrl &&
        !!video.portraitVideoUrl;

  const thumbUrl = video.thumbnail
    ? urlFor(video.thumbnail).width(600).url()
    : undefined;

  return (
    <Link href={`/videos/${video.slug.current}`} className="group block">
      <div
        className={`relative w-full overflow-hidden rounded-lg bg-gray-100 ${
          isPortrait ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        {thumbUrl && (
          <Image
            src={thumbUrl}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="mt-2">
        {video.categories?.[0] && (
          <span className="text-xs font-semibold uppercase tracking-wide text-red-600">
            {video.categories[0].title}
          </span>
        )}
        <h3 className="line-clamp-2 font-semibold">{video.title}</h3>
        <span className="flex items-center gap-1 text-sm text-gray-500">
          <IoEyeOutline /> {formatViews(video.views)}
        </span>
      </div>
    </Link>
  );
}
