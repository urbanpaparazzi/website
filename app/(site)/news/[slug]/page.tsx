import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import dayjs from "dayjs";
import { IoTimeOutline, IoEyeOutline } from "react-icons/io5";
import { sanityFetch } from "@/sanity/lib/live";
import { NEWS_POST_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { portableTextComponents } from "@/sanity/lib/portableTextComponents";
import { toPlainText } from "@/sanity/lib/toPlainText";
import ViewTracker from "@/components/ViewTracker";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  const { data } = await sanityFetch({
    query: NEWS_POST_QUERY,
    params: { slug },
  });
  return data;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const description = post.excerpt || toPlainText(post.body);
  return {
    title: `${post.title} | Urban Paparazzi Nigeria`,
    description,
    openGraph: {
      title: post.title,
      description,
      images: post.coverImage
        ? [urlFor(post.coverImage).width(1200).url()]
        : [],
    },
  };
}

export default async function NewsPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <ViewTracker type="news" slug={slug} />
      <div className="mb-4 flex flex-wrap gap-2">
        {post.categories?.map((c: { _id: string; title: string }) => (
          <span
            key={c._id}
            className="text-xs font-semibold uppercase tracking-wide text-red-600"
          >
            {c.title}
          </span>
        ))}
      </div>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
        {post.author?.name && <span>By {post.author.name}</span>}
        <span className="flex items-center gap-1">
          <IoTimeOutline /> {dayjs(post.publishedAt).format("MMMM D, YYYY")}
        </span>
        <span className="flex items-center gap-1">
          <IoEyeOutline /> {post.views ?? 0} views
        </span>
      </div>

      {post.coverImage && (
        <div className="relative my-6 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={urlFor(post.coverImage).width(1200).url()}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="prose max-w-none">
        <PortableText value={post.body} components={portableTextComponents} />
      </div>
    </article>
  );
}
