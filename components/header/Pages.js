import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function PagesPage() {
  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <Link href="/about">About Us</Link>
        </li>
        <li>
          <Link href="/authors">Authors</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/terms">Terms & Conditions</Link>
        </li>
        <li>
          <Link href="/privacy">Privacy Policy</Link>
        </li>
      </ul>
    </div>
  );
}
