"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { IoTimeOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { LiaCommentSolid } from "react-icons/lia";

// export default function ForTripple({ news, bg }) {
//   const categoryOptions = [
//     {
//       name: "Sports",
//     },
//     {
//       name: "Politics",
//     },
//     {
//       name: "Diamonds",
//     },
//   ];

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.wrapper__container}>
//         <div className={styles.breaking}>
//           {news.slice(15, 18).map((post, index) => (
//             <div className={styles.breaking__news} key={index}>
//               <div className="flex">
//                 <div
//                   className={styles.header}
//                   style={{ background: `${bg ? bg : ""}` }}
//                 >
//                   <p>{categoryOptions[index % categoryOptions.length].name}</p>
//                 </div>
//               </div>
//               <div className={`${styles.line} mb-8`}></div>
//               <div className="relative text-white">
//                 <img
//                   src={post.image}
//                   alt=""
//                   className={styles.tripple__news_trippleimage}
//                 />
//                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
//                   <div className={styles.tripple__news_category}>
//                     <p className="bg-[#379237] text-white px-4 py-2 rounded">
//                       {post.category.name}
//                     </p>
//                   </div>
//                   <p className={styles.tripple__news_name}>{post.name}</p>
//                   <div className={styles.tripple__news_timestamp}>
//                     <span className="flex">
//                       <IoTimeOutline />{" "}
//                       {dayjs(post.createdAt).format("MMMM D, YYYY")}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

export default function ForTripple({ news, bg }) {
  const categoryOptions = [
    {
      name: "Sports",
    },
    {
      name: "Politics",
    },
    {
      name: "Business",
    },
  ];

  // Filter news items where category name is "Politics"
  const filteredPoliticsNews = news.filter(
    (post) => post.category.name === "Politics",
  );

  const filteredSportssNews = news.filter(
    (post) => post.category.name === "Sports",
  );

  const filteredBusinessNews = news.filter(
    (post) => post.category.name === "Business",
  );

  // Take only one post from filteredPoliticsNews
  const politicsPost = filteredPoliticsNews.slice(0, 1);

  const sportsPost = filteredSportssNews.slice(0, 1);

  const businessPost = filteredBusinessNews.slice(0, 1);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__container}>
        <div className={styles.breaking}>
          {politicsPost.map((post, index) => (
            <div className={styles.breaking__news} key={index}>
              <div className="flex">
                <div
                  className={styles.header}
                  style={{ background: `${bg ? bg : ""}` }}
                >
                  <p>
                    {
                      categoryOptions.find((cat) => cat.name === "Politics")
                        .name
                    }
                  </p>
                </div>
              </div>
              <div className={`${styles.line} mb-8`}></div>
              <div className="relative text-white">
                <img
                  src={post.image}
                  alt=""
                  className={styles.tripple__news_trippleimage}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className={styles.tripple__news_category}>
                    <p className="bg-[#379237] text-white px-4 py-2 rounded">
                      {post.category.name}
                    </p>
                  </div>
                  <Link href={`/news/${post.slug}`}>
                    <p className={styles.tripple__news_name}>{post.name}</p>
                  </Link>
                  <div className={styles.tripple__news_timestamp}>
                    <span className="flex">
                      <IoTimeOutline />{" "}
                      {dayjs(post.createdAt).format("MMMM D, YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {sportsPost.map((post, index) => (
            <div className={styles.breaking__news} key={index}>
              <div className="flex">
                <div
                  className={styles.header}
                  style={{ background: `${bg ? bg : ""}` }}
                >
                  <p>
                    {categoryOptions.find((cat) => cat.name === "Sports").name}
                  </p>
                </div>
              </div>
              <div className={`${styles.line} mb-8`}></div>
              <div className="relative text-white">
                <img
                  src={post.image}
                  alt=""
                  className={styles.tripple__news_trippleimage}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className={styles.tripple__news_category}>
                    <p className="bg-[#379237] text-white px-4 py-2 rounded">
                      {post.category.name}
                    </p>
                  </div>
                  <Link href={`/news/${post.slug}`}>
                    <p className={styles.tripple__news_name}>{post.name}</p>
                  </Link>
                  <div className={styles.tripple__news_timestamp}>
                    <span className="flex">
                      <IoTimeOutline />{" "}
                      {dayjs(post.createdAt).format("MMMM D, YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {businessPost.map((post, index) => (
            <div className={styles.breaking__news} key={index}>
              <div className="flex">
                <div
                  className={styles.header}
                  style={{ background: `${bg ? bg : ""}` }}
                >
                  <p>
                    {
                      categoryOptions.find((cat) => cat.name === "Business")
                        .name
                    }
                  </p>
                </div>
              </div>
              <div className={`${styles.line} mb-8`}></div>
              <div className="relative text-white">
                <img
                  src={post.image}
                  alt=""
                  className={styles.tripple__news_trippleimage}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className={styles.tripple__news_category}>
                    <p className="bg-[#379237] text-white px-4 py-2 rounded">
                      {post.category.name}
                    </p>
                  </div>
                  <Link href={`/news/${post.slug}`}>
                    <p className={styles.tripple__news_name}>{post.name}</p>
                  </Link>
                  <div className={styles.tripple__news_timestamp}>
                    <span className="flex">
                      <IoTimeOutline />{" "}
                      {dayjs(post.createdAt).format("MMMM D, YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
