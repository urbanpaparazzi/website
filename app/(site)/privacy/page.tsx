import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/live";
import { PRIVACY_PAGE_QUERY } from "@/sanity/lib/queries";
import { portableTextComponents } from "@/sanity/lib/portableTextComponents";

export const metadata = {
  title: "Privacy Policy",
  description: "Read the Urban Paparazzi privacy policy.",
  alternates: { canonical: "/privacy" },
};

export default async function PrivacyPage() {
  const { data } = await sanityFetch({ query: PRIVACY_PAGE_QUERY });

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 prose max-w-none">
      <h1>{data?.title ?? "Privacy Policy"}</h1>
      {data?.body ? (
        <PortableText value={data.body} components={portableTextComponents} />
      ) : (
        <p>Content coming soon.</p>
      )}
    </article>
  );
}
