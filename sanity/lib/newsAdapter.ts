import { urlFor } from "./image";

interface SanityCategoryRef {
  _id: string;
  title: string;
  slug?: { current: string };
}

interface SanityImage {
  asset?: { _ref: string };
}

interface SanityNewsPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: SanityImage;
  categories?: SanityCategoryRef[];
  views?: number;
  publishedAt: string;
}

/**
 * Legacy UI components (home/hero, home/mini, breakingNews/*) were built
 * against the old Mongo News shape (post.name/post.image/post.category.name/
 * post.slug/post.createdAt/post.description). Rather than rewrite every one
 * of those presentational components, adapt Sanity's newsPost documents into
 * that same shape here.
 */
export function adaptNewsPost(post: SanityNewsPost) {
  return {
    _id: post._id,
    slug: post.slug.current,
    image: post.coverImage ? urlFor(post.coverImage).width(800).url() : "",
    name: post.title,
    category: { name: post.categories?.[0]?.title ?? "" },
    description: post.excerpt ?? "",
    createdAt: post.publishedAt,
    views: post.views ?? 0,
  };
}

export function adaptNewsPosts(posts: SanityNewsPost[]) {
  return posts.map(adaptNewsPost);
}

export function adaptCategory(category: SanityCategoryRef) {
  return {
    _id: category._id,
    name: category.title,
    slug: category.slug?.current ?? "",
  };
}

export function adaptCategories(categories: SanityCategoryRef[]) {
  return categories.map(adaptCategory);
}
