"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import dayjs from "dayjs";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function Top({ country }) {
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <Link href="/contact">
              <span>Contact</span>
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/about">
              <span>About</span>
            </Link>
          </li>
        </ul>
        <div className={styles.date}>
          <FaRegCalendarAlt />
          <span>{dayjs().format("MMMM D, YYYY")}</span>
        </div>
      </div>
    </div>
  );
}
