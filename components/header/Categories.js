import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function CategoryPage({ categories }) {
  return (
    <div className={styles.menu}>
      {categories.map((category, i) => (
        <ul className={styles.menu__categories} key={category._id || i}>
          <li>
            <Link href={`/category/${category.slug?.current}`}>
              {category.title}
            </Link>
          </li>
        </ul>
      ))}
    </div>
  );
}
