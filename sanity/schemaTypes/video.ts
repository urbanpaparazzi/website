import { defineArrayMember, defineField, defineType } from "sanity";
import { PlayIcon } from "@sanity/icons/Play";

export const video = defineType({
  name: "video",
  title: "Video",
  type: "document",
  icon: PlayIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "sources", title: "Video Sources" },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      group: "content",
      options: { hotspot: true },
      description:
        "Used on cards and as the poster before playback. Crop/orientation should match whichever video URL is primary below.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "category" }] }),
      ],
      validation: (Rule) => Rule.min(1).required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "content",
      to: [{ type: "author" }],
      description: "Who posted / wrote up this video.",
    }),
    defineField({
      name: "host",
      title: "Host",
      type: "reference",
      group: "content",
      to: [{ type: "host" }],
      description: "Who is featured/hosting in the video, if applicable.",
    }),
    defineField({
      name: "landscapeVideoUrl",
      title: "Landscape Video URL",
      type: "url",
      group: "sources",
      description:
        "Paste a YouTube, Facebook, or other widescreen (16:9) video link.",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "portraitVideoUrl",
      title: "Portrait Video URL",
      type: "url",
      group: "sources",
      description:
        "Paste a YouTube Shorts, Instagram Reel, TikTok, or other vertical (9:16) video link.",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "primaryOrientation",
      title: "Primary Orientation",
      type: "string",
      group: "sources",
      description:
        "Which version to show by default on cards and the video page when both are provided.",
      options: {
        list: [
          { title: "Landscape", value: "landscape" },
          { title: "Portrait", value: "portrait" },
        ],
        layout: "radio",
      },
      initialValue: "landscape",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as
            | { landscapeVideoUrl?: string; portraitVideoUrl?: string }
            | undefined;
          if (!parent?.landscapeVideoUrl && !parent?.portraitVideoUrl) {
            return "Add at least one of Landscape Video URL or Portrait Video URL.";
          }
          if (value === "landscape" && !parent?.landscapeVideoUrl) {
            return "Primary orientation is Landscape but no Landscape Video URL was provided.";
          }
          if (value === "portrait" && !parent?.portraitVideoUrl) {
            return "Primary orientation is Portrait but no Portrait Video URL was provided.";
          }
          return true;
        }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "views",
      title: "Views",
      type: "number",
      group: "meta",
      initialValue: 0,
      readOnly: true,
      description:
        "Incremented automatically when a visitor opens the video page.",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "meta",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "thumbnail",
      views: "views",
    },
    prepare({ title, media, views }) {
      return {
        title,
        subtitle: typeof views === "number" ? `${views} views` : undefined,
        media,
      };
    },
  },
});
