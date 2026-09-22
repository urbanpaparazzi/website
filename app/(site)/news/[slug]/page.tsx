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
import ImageCarousel from "@/components/ImageCarousel";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://urbanpaparazzi.com";

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
  const canonicalUrl = `${baseUrl}/news/${slug}`;
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage)
        .width(1200)
        .height(630)
        .fit("crop")
        .format("jpg")
        .url()
    : undefined;

  return {
    title: `${post.title} | Urban Paparazzi Nigeria`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: post.title,
      description,
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : ["Urban Paparazzi"],
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

function getGalleryImages(post: any) {
  const allImages = [
    ...(post.coverImage ? [post.coverImage] : []),
    ...(post.galleryImages || []),
  ];
  const seenRefs = new Set<string>();

  return allImages
    .filter((image: any) => {
      const ref = image?.asset?._ref;
      if (!ref) return false;
      if (seenRefs.has(ref)) return false;
      seenRefs.add(ref);
      return true;
    })
    .map((image: any) => ({
      ...image,
      url: urlFor(image).width(1600).auto("format").url(),
    }));
}

export default async function NewsPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const galleryImages = getGalleryImages(post);
  const canonicalUrl = `${baseUrl}/news/${slug}`;
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage)
        .width(1200)
        .height(630)
        .fit("crop")
        .format("jpg")
        .url()
    : undefined;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    headline: post.title,
    description: post.excerpt || toPlainText(post.body),
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: post.publishedAt,
    author: post.author?.name
      ? { "@type": "Person", name: post.author.name }
      : { "@type": "Organization", name: "Urban Paparazzi Nigeria" },
    publisher: {
      "@type": "Organization",
      name: "Urban Paparazzi Nigeria",
      logo: { "@type": "ImageObject", url: `${baseUrl}/logo.png` },
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
      <div className="mt-2 flex items-center gap-2 text-xs md:text-sm text-gray-500">
        {post.author?.name && <span>By {post.author.name}</span>}
        <span className="flex items-center gap-1">
          <IoTimeOutline /> {dayjs(post.publishedAt).format("MMMM D, YYYY")}
        </span>
        <span className="flex items-center gap-1">
          <IoEyeOutline /> {post.views ?? 0} views
        </span>
      </div>

      {galleryImages.length > 0 && (
        <ImageCarousel
          images={galleryImages}
          title={post.title}
          autoSwipeInterval={5000}
        />
      )}

      <div className="prose max-w-none">
        <PortableText value={post.body} components={portableTextComponents} />
      </div>
    </article>
  );
}
