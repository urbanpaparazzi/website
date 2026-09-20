import React from "react";
import styles from "./styles.module.scss";
import Top from "./Top";
import Main from "./Main";

export default function Header({ categories }) {
  return (
    <header className={`${styles.header}`}>
      <Top />
      <nav className={`${styles.done} sticky top-0`}>
        <Main categories={categories} />
      </nav>
    </header>
  );
}
