"use client";

import Link from "next/link";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import {
  GrFacebookOption,
  GrInstagram,
  GrTiktok,
  GrTwitter,
} from "react-icons/gr";
import { CgMenuRight, CgMenuLeft } from "react-icons/cg";
import styles from "./styles.module.scss";
import { RiSearch2Line } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CategoryPage from "./Categories";
import PagesPage from "./Pages";
import { AiOutlineGooglePlus } from "react-icons/ai";

export default function Main({ categories }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length > 1) {
      router.push(`/news?search=${query}`);
    }
  };
  const [menuVisible, setMenuVisible] = useState(false);
  const [homeVisible, setHomeVisible] = useState(false);
  const [newsVisible, setNewsVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [pagesVisible, setPagesVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const searchRef = useRef(null);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 900);
    }

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const toggleMenu = () => {
    setMenuVisible((prevVisible) => !prevVisible);
  };

  return (
    <>
      <div>
        <div className={styles.name}>
          <div className={styles.name__menu_close}>
            {!menuVisible ? (
              <CgMenuLeft onClick={toggleMenu} />
            ) : (
              <CgMenuRight onClick={toggleMenu} />
            )}
          </div>
          <Link href="/">
            <div className={styles.nameText}>
              <p>
                <b>URBAN</b> PAPARAZZI
              </p>
            </div>
          </Link>
        </div>
        {menuVisible ? (
          <div className={`${styles.menumain}`}>
            <div className={`${styles.menumain__container}`}>
              <ul>
                <li className={styles.li}>
                  <div className={styles.flex}>
                    <Link href="/">Home</Link>
                  </div>
                </li>
                <li className={styles.li}>
                  <div className={styles.flex}>
                    <Link href="/news">All News</Link>
                  </div>
                </li>
                <li className={styles.li}>
                  <div className={styles.flex}>
                    <Link href="/videos">Videos</Link>
                  </div>
                </li>
                <li
                  className={styles.li}
                  onClick={() => setCategoryVisible(true)}
                  onMouseLeave={() => setCategoryVisible(false)}
                >
                  <div className={styles.flex}>
                    <span>Categories</span>
                    {!categoryVisible ? (
                      <RiArrowDropDownFill />
                    ) : (
                      <RiArrowDropUpFill />
                    )}
                  </div>
                  {categoryVisible && <CategoryPage categories={categories} />}
                </li>
                <li
                  className={styles.li}
                  onClick={() => setPagesVisible(true)}
                  onMouseLeave={() => setPagesVisible(false)}
                >
                  <div className={styles.flex}>
                    <span>Pages</span>
                    {!pagesVisible ? (
                      <RiArrowDropDownFill />
                    ) : (
                      <RiArrowDropUpFill />
                    )}
                  </div>
                  {pagesVisible && <PagesPage />}
                </li>
                <li
                  className={styles.li}
                  // onClick={() => setSearchVisible(true)}
                  // onMouseUp={() => setSearchVisible(false)}
                  ref={searchRef}
                >
                  <button
                    type="submit"
                    className={`${
                      searchVisible ? "hidden" : styles.search__icon
                    }`}
                    onClick={() => setSearchVisible(true)}
                  >
                    <RiSearch2Line />
                  </button>

                  {searchVisible && (
                    <form
                      onSubmit={(e) => handleSearch(e)}
                      className={styles.search}
                    >
                      <input
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <button type="submit" className={styles.search__icon}>
                        <RiSearch2Line />
                      </button>
                    </form>
                  )}
                </li>
              </ul>
              <div className={styles.main__container_socials}>
                <ul className={styles.socialIcons}>
                  <li>
                    <GrFacebookOption />
                  </li>
                  <li>
                    <GrTwitter />
                  </li>
                  <li>
                    <AiOutlineGooglePlus />
                  </li>
                  <li>
                    <GrInstagram />
                  </li>
                  <li>
                    <GrTiktok />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={`${styles.main}`}>
        <div className={`${styles.main__container}`}>
          <ul className="flex">
            <li className={styles.li}>
              <div className={styles.flex}>
                <Link href="/">Home</Link>
              </div>
            </li>
            <li className={styles.li}>
              <div className={styles.flex}>
                <Link href="/news">All News</Link>
              </div>
            </li>
            <li className={styles.li}>
              <div className={styles.flex}>
                <Link href="/videos">Videos</Link>
              </div>
            </li>
            <li
              className={styles.li}
              onMouseOver={() => setCategoryVisible(true)}
              onMouseLeave={() => setCategoryVisible(false)}
            >
              <div className={styles.flex}>
                <span>Categories</span>
                <RiArrowDropDownFill />
              </div>
              {categoryVisible && <CategoryPage categories={categories} />}
            </li>
            <li
              className={styles.li}
              onMouseOver={() => setPagesVisible(true)}
              onMouseLeave={() => setPagesVisible(false)}
            >
              <div className={styles.flex}>
                <span>Pages</span>
                <RiArrowDropDownFill />
              </div>
              {pagesVisible && <PagesPage />}
            </li>
            <li
              className={styles.li}
              // onClick={() => setSearchVisible(true)}
              // onMouseUp={() => setSearchVisible(false)}
              ref={searchRef}
            >
              <button
                type="submit"
                className={`${searchVisible ? "hidden" : styles.search__icon}`}
                onClick={() => setSearchVisible(true)}
              >
                <RiSearch2Line />
              </button>

              {searchVisible && (
                <form
                  onSubmit={(e) => handleSearch(e)}
                  className={styles.search}
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button type="submit" className={styles.search__icon}>
                    <RiSearch2Line />
                  </button>
                </form>
              )}
            </li>
          </ul>
          <div className={styles.main__container_socials}>
            <ul className={styles.socialIcons}>
              <li>
                <GrFacebookOption />
              </li>
              <li>
                <GrTwitter />
              </li>
              <li>
                <AiOutlineGooglePlus />
              </li>
              <li>
                <GrInstagram />
              </li>
              <li>
                <GrTiktok />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
