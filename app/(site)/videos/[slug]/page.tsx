import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import dayjs from "dayjs";
import { IoTimeOutline, IoEyeOutline } from "react-icons/io5";
import { sanityFetch } from "@/sanity/lib/live";
import { VIDEO_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { portableTextComponents } from "@/sanity/lib/portableTextComponents";
import { toPlainText } from "@/sanity/lib/toPlainText";
import ViewTracker from "@/components/ViewTracker";
import VideoPlayer from "@/components/VideoPlayer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getVideo(slug: string) {
  const { data } = await sanityFetch({ query: VIDEO_QUERY, params: { slug } });
  return data;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideo(slug);
  if (!video) return {};

  const description = toPlainText(video.description);
  return {
    title: `${video.title} | Urban Paparazzi Nigeria`,
    description,
    openGraph: {
      title: video.title,
      description,
      images: video.thumbnail
        ? [urlFor(video.thumbnail).width(1200).url()]
        : [],
    },
  };
}

export default async function VideoPage({ params }: PageProps) {
  const { slug } = await params;
  const video = await getVideo(slug);
  if (!video) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <ViewTracker type="video" slug={slug} />
      <div className="mb-4 flex flex-wrap gap-2">
        {video.categories?.map((c: { _id: string; title: string }) => (
          <span
            key={c._id}
            className="text-xs font-semibold uppercase tracking-wide text-red-600"
          >
            {c.title}
          </span>
        ))}
      </div>
      <h1 className="text-3xl font-bold">{video.title}</h1>
      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        {video.host?.name && <span>Hosted by {video.host.name}</span>}
        {video.author?.name && <span>By {video.author.name}</span>}
        <span className="flex items-center gap-1">
          <IoTimeOutline /> {dayjs(video.publishedAt).format("MMMM D, YYYY")}
        </span>
        <span className="flex items-center gap-1">
          <IoEyeOutline /> {video.views ?? 0} views
        </span>
      </div>

      <div className="my-6">
        <VideoPlayer
          title={video.title}
          landscapeVideoUrl={video.landscapeVideoUrl}
          portraitVideoUrl={video.portraitVideoUrl}
          primaryOrientation={video.primaryOrientation}
          thumbnail={video.thumbnail}
        />
      </div>

      {video.description && (
        <div className="prose max-w-none">
          <PortableText
            value={video.description}
            components={portableTextComponents}
          />
        </div>
      )}
    </article>
  );
}
