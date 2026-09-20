import type { SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { category } from "./category";
import { author } from "./author";
import { host } from "./host";
import { video } from "./video";
import { newsPost } from "./newsPost";
import { termsPage } from "./termsPage";
import { privacyPage } from "./privacyPage";
import { newsletterSubscription } from "./newsletterSubscription";

export const schemaTypes = [
  siteSettings,
  category,
  author,
  host,
  video,
  newsPost,
  termsPage,
  privacyPage,
  newsletterSubscription,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
};
