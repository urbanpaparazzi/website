import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";

export default function Copyright({ country }) {
  return (
    <div className={styles.footer__copyright}>
      <section>©2010 URBAN PAPARAZZI . All Rights Reserved.</section>
      <section>
        <ul>
          {data.map((link) => (
            <li key={link.name}>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
          <li>
            <a className="flex">
              <IoLocationSharp /> {country?.name}
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
const data = [
  {
    name: "Privacy & Cookie Policy",
    link: "/privacy",
  },
  {
    name: "Terms & Conditions",
    link: "/terms",
  },
];
