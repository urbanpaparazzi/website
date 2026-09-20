import { defineLive } from "next-sanity/live";
import { client } from "./client";

const token = process.env.SANITY_API_READ_TOKEN;

const live = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});

export const SanityLive = live.SanityLive;

// Queries are defined locally, so Sanity cannot infer their result types here.
export const sanityFetch = live.sanityFetch as unknown as <T = any>(
  args: Parameters<typeof live.sanityFetch>[0],
) => Promise<{ data: T }>;
