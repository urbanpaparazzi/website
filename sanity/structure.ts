import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons/Cog";
import { UserIcon } from "@sanity/icons/User";
import { PlayIcon } from "@sanity/icons/Play";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { TagIcon } from "@sanity/icons/Tag";
import { EnvelopeIcon } from "@sanity/icons/Envelope";

const SINGLETONS = [
  { type: "siteSettings", title: "Site Settings", icon: CogIcon },
  { type: "termsPage", title: "Terms & Conditions", icon: DocumentTextIcon },
  { type: "privacyPage", title: "Privacy Policy", icon: DocumentTextIcon },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Urban Paparazzi")
    .items([
      ...SINGLETONS.map((singleton) =>
        S.listItem()
          .title(singleton.title)
          .icon(singleton.icon)
          .id(singleton.type)
          .child(
            S.document()
              .schemaType(singleton.type)
              .documentId(singleton.type)
              .title(singleton.title),
          ),
      ),
      S.divider(),
      S.listItem()
        .title("Videos")
        .icon(PlayIcon)
        .child(S.documentTypeList("video").title("Videos")),
      S.listItem()
        .title("News Posts")
        .icon(DocumentTextIcon)
        .child(S.documentTypeList("newsPost").title("News Posts")),
      S.listItem()
        .title("Categories")
        .icon(TagIcon)
        .child(S.documentTypeList("category").title("Categories")),
      S.listItem()
        .title("Authors")
        .icon(UserIcon)
        .child(S.documentTypeList("author").title("Authors")),
      S.listItem()
        .title("Hosts")
        .icon(UserIcon)
        .child(S.documentTypeList("host").title("Hosts")),
      S.listItem()
        .title("Newsletter Subscriptions")
        .icon(EnvelopeIcon)
        .child(
          S.documentTypeList("newsletterSubscription").title(
            "Newsletter Subscriptions",
          ),
        ),
    ]);
