import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { AUTHORS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Authors",
  description:
    "Meet the journalists, writers and contributors reporting Nigerian news, entertainment, culture and lifestyle for Urban Paparazzi.",
  alternates: { canonical: "/authors" },
};

interface Author {
  _id: string;
  name: string;
  slug?: { current: string };
  photo?: unknown;
  role?: string;
  bio?: string;
  articleCount?: number;
  videoCount?: number;
}

export default async function AuthorsPage() {
  const { data } = await sanityFetch({ query: AUTHORS_QUERY });
  const authors = (data ?? []) as Author[];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8 max-w-2xl">
        <h1 className="text-4xl font-bold">Our Authors</h1>
        <p className="mt-3 text-gray-600">
          Meet the people reporting, writing and creating the stories you read
          and watch here.
        </p>
      </header>

      {authors.length === 0 ? (
        <p className="text-gray-600">Authors will appear here soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => {
            const photoUrl = author.photo
              ? urlFor(author.photo).width(500).height(500).fit("crop").url()
              : null;

            return (
              <article
                key={author._id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="relative aspect-square bg-gray-100">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-6xl font-bold text-gray-300">
                      {author.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold">{author.name}</h2>
                  {author.role && (
                    <p className="mt-1 text-sm font-medium text-red-600">
                      {author.role}
                    </p>
                  )}
                  {author.bio && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      {author.bio}
                    </p>
                  )}
                  <div className="mt-4 flex gap-4 border-t border-gray-100 pt-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    <span>{author.articleCount ?? 0} articles</span>
                    <span>{author.videoCount ?? 0} videos</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
