import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
*[_type == "siteSettings"][0]{
  siteTitle,
  tagline,
  logo,
  email,
  socialLinks[]{ platform, url },
  footerNote
}`);

export const VIDEOS_QUERY = defineQuery(`
*[_type == "video"] | order(publishedAt desc){
  _id,
  title,
  slug,
  thumbnail,
  landscapeVideoUrl,
  portraitVideoUrl,
  primaryOrientation,
  categories[]->{ _id, title, slug },
  author->{ _id, name, slug, photo },
  host->{ _id, name, slug },
  views,
  publishedAt
}`);

export const FEATURED_VIDEOS_QUERY = defineQuery(`
*[_type == "video"] | order(publishedAt desc)[0...6]{
  _id,
  title,
  slug,
  thumbnail,
  landscapeVideoUrl,
  portraitVideoUrl,
  primaryOrientation,
  categories[]->{ _id, title, slug },
  author->{ _id, name, slug, photo },
  host->{ _id, name, slug },
  views,
  publishedAt
}`);

export const VIDEOS_BY_CATEGORY_QUERY = defineQuery(`
*[_type == "video" && $categorySlug in categories[]->slug.current] | order(publishedAt desc){
  _id,
  title,
  slug,
  thumbnail,
  landscapeVideoUrl,
  portraitVideoUrl,
  primaryOrientation,
  categories[]->{ _id, title, slug },
  author->{ _id, name, slug, photo },
  host->{ _id, name, slug },
  views,
  publishedAt
}`);

export const VIDEO_QUERY = defineQuery(`
*[_type == "video" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  thumbnail,
  landscapeVideoUrl,
  portraitVideoUrl,
  primaryOrientation,
  categories[]->{ _id, title, slug },
  author->{ _id, name, slug, photo, role },
  host->{ _id, name, slug, role, photo },
  description,
  views,
  publishedAt
}`);

export const NEWS_QUERY = defineQuery(`
*[_type == "newsPost"] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  categories[]->{ _id, title, slug },
  author->{ _id, name, slug, photo },
  views,
  publishedAt
}`);

export const FEATURED_NEWS_QUERY = defineQuery(`
*[_type == "newsPost"] | order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  categories[]->{ _id, title, slug },
  author->{ _id, name, slug, photo },
  views,
  publishedAt
}`);

export const NEWS_POST_QUERY = defineQuery(`
*[_type == "newsPost" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  galleryImages,
  categories[]->{ _id, title, slug },
  author->{ _id, name, slug, photo, role, bio },
  body,
  views,
  publishedAt
}`);

export const CATEGORIES_QUERY = defineQuery(`
*[_type == "category"] | order(title asc){
  _id,
  title,
  slug
}`);

export const AUTHORS_QUERY = defineQuery(`
*[_type == "author"] | order(name asc){
  _id,
  name,
  slug,
  photo,
  role,
  bio,
  "articleCount": count(*[_type == "newsPost" && references(^._id)]),
  "videoCount": count(*[_type == "video" && references(^._id)])
}`);

export const TERMS_PAGE_QUERY = defineQuery(`
*[_type == "termsPage"][0]{ title, body, updatedAt }`);

export const PRIVACY_PAGE_QUERY = defineQuery(`
*[_type == "privacyPage"][0]{ title, body, updatedAt }`);
