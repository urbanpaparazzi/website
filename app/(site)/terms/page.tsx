import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/live";
import { TERMS_PAGE_QUERY } from "@/sanity/lib/queries";
import { portableTextComponents } from "@/sanity/lib/portableTextComponents";

export const metadata = {
  title: "Terms & Conditions",
  description: "Read the terms and conditions for using Urban Paparazzi.",
  alternates: { canonical: "/terms" },
};

export default async function TermsPage() {
  const { data } = await sanityFetch({ query: TERMS_PAGE_QUERY });

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 prose max-w-none">
      <h1>{data?.title ?? "Terms & Conditions"}</h1>
      {data?.body ? (
        <PortableText value={data.body} components={portableTextComponents} />
      ) : (
        <p>Content coming soon.</p>
      )}
    </article>
  );
}
