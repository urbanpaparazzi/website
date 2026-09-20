import { sanityFetch } from "@/sanity/lib/live";
import { NEWS_QUERY } from "@/sanity/lib/queries";
import { adaptNewsPosts } from "@/sanity/lib/newsAdapter";
import Link from "next/link";
import { IoTimeOutline, IoEyeOutline } from "react-icons/io5";
import dayjs from "dayjs";
import styles from "@/styles/news.module.scss";

export const metadata = {
  title: "Latest Nigerian News",
  description:
    "Read the latest Nigerian news, celebrity stories, entertainment updates, culture and lifestyle coverage from Urban Paparazzi.",
  alternates: { canonical: "/news" },
};

export default async function NewsListPage() {
  const { data } = await sanityFetch({ query: NEWS_QUERY });
  const news = adaptNewsPosts(data ?? []);

  return (
    <div className={styles.product}>
      <div className={styles.product__container}>
        <div className={styles.path}>Home / news</div>
        <div className={styles.product__main}>
          <div className={styles.product__main_one}>
            {news.map((post) => (
              <div key={post._id} className={styles.newsPage}>
                <div className={styles.newsPage__post}>
                  <img src={post.image} alt={post.name} />
                  <span className={styles.newsPage__post_category}>
                    {post.category.name}
                  </span>
                  <Link href={`/news/${post.slug}`}>
                    <p className={styles.newsPage__post_name}>{post.name}</p>
                  </Link>
                  <div className={styles.newsPage__post_timestamp}>
                    <span className="flex">
                      <IoTimeOutline /> {dayjs(post.createdAt).format("MMMM D")}
                    </span>
                    <span className="flex">
                      <IoEyeOutline /> {post.views} views
                    </span>
                  </div>
                  <p className={styles.newsPage__post_desc}>
                    {post.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
