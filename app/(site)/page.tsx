import { sanityFetch } from "@/sanity/lib/live";
import { FEATURED_NEWS_QUERY } from "@/sanity/lib/queries";
import { adaptNewsPosts } from "@/sanity/lib/newsAdapter";
import MiniNews from "@/components/home/mini";
import HeroNews from "@/components/home/hero";
import BreakingNews from "@/components/breakingNews";
import { CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { adaptCategories } from "@/sanity/lib/newsAdapter";
import styles from "@/styles/Home.module.scss";

export const metadata = {
  title: "Nigerian News, Entertainment & Culture",
  description:
    "Follow breaking Nigerian news, celebrity updates, entertainment, lifestyle, culture and original interviews from Urban Paparazzi.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [{ data: news }, { data: categories }] = await Promise.all([
    sanityFetch({ query: FEATURED_NEWS_QUERY }),
    sanityFetch({ query: CATEGORIES_QUERY }),
  ]);

  const adaptedNews = adaptNewsPosts(news ?? []);
  const adaptedCategories = adaptCategories(categories ?? []);

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <MiniNews news={adaptedNews} />
        <div className={styles.container__width}>
          <HeroNews news={adaptedNews} />
        </div>
        <BreakingNews
          header="Featured Stories"
          bg="#333333"
          news={adaptedNews}
          categories={adaptedCategories}
        />
      </div>
    </div>
  );
}
