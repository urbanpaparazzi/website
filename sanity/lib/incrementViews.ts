import { writeClient } from "./client";

type ViewableType = "video" | "newsPost";

/**
 * Increments the `views` counter for a document identified by its slug.
 * Requires SANITY_API_WRITE_TOKEN (editor rights) to be set server-side.
 */
export async function incrementViews(type: ViewableType, slug: string) {
  const doc = await writeClient.fetch<{ _id: string } | null>(
    `*[_type == $type && slug.current == $slug][0]{ _id }`,
    { type, slug },
  );

  if (!doc?._id) return null;

  return writeClient
    .patch(doc._id)
    .inc({ views: 1 })
    .commit({ autoGenerateArrayKeys: true });
}
