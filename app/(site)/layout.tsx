import { sanityFetch } from "@/sanity/lib/live";
import { CATEGORIES_QUERY, FEATURED_NEWS_QUERY } from "@/sanity/lib/queries";
import { adaptCategories, adaptNewsPosts } from "@/sanity/lib/newsAdapter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ data: categories }, { data: news }] = await Promise.all([
    sanityFetch({ query: CATEGORIES_QUERY }),
    sanityFetch({ query: FEATURED_NEWS_QUERY }),
  ]);

  const adaptedCategories = adaptCategories(categories ?? []);
  const adaptedNews = adaptNewsPosts(news ?? []);

  return (
    <div>
      <Header categories={adaptedCategories} />
      {children}
      <Footer country={null} news={adaptedNews} />
    </div>
  );
}
