"use client";

import { useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { urlFor } from "@/sanity/lib/image";
import { detectVideoPlatform } from "@/sanity/lib/videoEmbed";

interface VideoPlayerProps {
  title: string;
  landscapeVideoUrl?: string | null;
  portraitVideoUrl?: string | null;
  primaryOrientation?: "landscape" | "portrait" | null;
  thumbnail?: unknown;
}

export default function VideoPlayer({
  title,
  landscapeVideoUrl,
  portraitVideoUrl,
  primaryOrientation,
  thumbnail,
}: VideoPlayerProps) {
  const [orientation, setOrientation] = useState<"landscape" | "portrait">(
    primaryOrientation === "portrait" && portraitVideoUrl
      ? "portrait"
      : "landscape",
  );

  const activeUrl =
    orientation === "portrait"
      ? portraitVideoUrl || landscapeVideoUrl
      : landscapeVideoUrl || portraitVideoUrl;

  const detected = detectVideoPlatform(activeUrl);
  const isPortrait = orientation === "portrait";
  const posterUrl = thumbnail ? urlFor(thumbnail).width(1200).url() : undefined;

  const containerClass = isPortrait
    ? "relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-lg bg-black"
    : "relative aspect-video w-full overflow-hidden rounded-lg bg-black";

  return (
    <div>
      {landscapeVideoUrl && portraitVideoUrl && (
        <div className="mb-3 flex gap-2">
          <button
            type="button"
            onClick={() => setOrientation("landscape")}
            className={`rounded px-3 py-1 text-sm font-medium ${
              orientation === "landscape"
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Landscape
          </button>
          <button
            type="button"
            onClick={() => setOrientation("portrait")}
            className={`rounded px-3 py-1 text-sm font-medium ${
              orientation === "portrait"
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Portrait
          </button>
        </div>
      )}

      <div className={containerClass}>
        {(() => {
          if (!activeUrl) {
            return posterUrl ? (
              <Image
                src={posterUrl}
                alt={title}
                fill
                className="object-cover"
              />
            ) : null;
          }

          if (detected.embedUrl) {
            return (
              <iframe
                src={detected.embedUrl}
                title={title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            );
          }

          if (detected.platform === "instagram") {
            return (
              <div className="absolute inset-0 overflow-y-auto bg-white">
                <Script
                  async
                  src="https://www.instagram.com/embed.js"
                  strategy="lazyOnload"
                />
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={activeUrl}
                  data-instgrm-version="14"
                  style={{ margin: 0, width: "100%" }}
                />
              </div>
            );
          }

          if (detected.platform === "tiktok") {
            return (
              <div className="absolute inset-0 overflow-y-auto bg-white">
                <Script
                  async
                  src="https://www.tiktok.com/embed.js"
                  strategy="lazyOnload"
                />
                <blockquote
                  className="tiktok-embed"
                  cite={activeUrl}
                  style={{ margin: 0 }}
                >
                  <a href={activeUrl} target="_blank" rel="noreferrer">
                    Watch on TikTok
                  </a>
                </blockquote>
              </div>
            );
          }

          if (detected.platform === "twitter") {
            return (
              <div className="absolute inset-0 overflow-y-auto bg-white">
                <Script
                  async
                  src="https://platform.twitter.com/widgets.js"
                  strategy="lazyOnload"
                />
                <blockquote className="twitter-tweet">
                  <a href={activeUrl}>Watch on X</a>
                </blockquote>
              </div>
            );
          }

          // Generic fallback: link out to the original source.
          return (
            <a
              href={activeUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white"
            >
              {posterUrl && (
                <Image
                  src={posterUrl}
                  alt={title}
                  fill
                  className="object-cover opacity-60"
                />
              )}
              <span className="relative z-10 rounded bg-black/70 px-4 py-2 text-sm font-medium">
                Watch original video
              </span>
            </a>
          );
        })()}
      </div>
    </div>
  );
}
