import { sanityFetch } from "@/sanity/lib/live";
import { VIDEOS_QUERY } from "@/sanity/lib/queries";
import VideoCard from "@/components/VideoCard";

export const metadata = {
  title: "Nigerian Entertainment & News Videos",
  description:
    "Watch interviews, celebrity news, entertainment, culture and lifestyle videos from Urban Paparazzi Nigeria.",
  alternates: { canonical: "/videos" },
};

export default async function VideosPage() {
  const { data: videos } = await sanityFetch({ query: VIDEOS_QUERY });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Videos</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(videos ?? []).map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}
