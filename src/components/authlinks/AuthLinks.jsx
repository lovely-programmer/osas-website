"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import styles from "./authLinks.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import { IoIosSearch } from "react-icons/io";
import Searchbar from "../searchbar/Searchbar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthLinks() {
  const { theme, toggle } = useContext(ThemeContext);
  const router = useRouter();
  const { status } = useSession();

  const [open, setOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const logOut = () => {
    router.push("/signin");
    signOut();
    setShowSearchBar(!showSearchBar);
    localStorage.setItem("currentIndex", 0);
  };

  if (status === "unauthenticated") {
    router.push("/signin");
  }

  console.log(status);

  return (
    <>
      {status !== "unauthorized" && (
        <>
          <div className={styles.container}>
            <Link className={styles.link} href="/subscribe">
              Subscribe
            </Link>
            <Link className={styles.link} href="/post">
              Post
            </Link>
            <div onClick={logOut}>Logout</div>
          </div>
        </>
      )}

      <div className={styles.burgerContainer}>
        <IoIosSearch onClick={() => setShowSearchBar(!showSearchBar)} />
        <div className={styles.burger} onClick={() => setOpen(!open)}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </div>

      {showSearchBar && <Searchbar />}

      {open && (
        <div className={styles.responsiveMenu}>
          <div className={`wrapper ${styles.menu}`}>
            {status !== "unauthorized" && (
              <>
                <div className={styles.menuContainer}>
                  <Link href="/message" onClick={() => setOpen(!open)}>
                    Subscribe
                  </Link>
                  <Link href="/post" onClick={() => setOpen(!open)}>
                    Post
                  </Link>
                  <div onClick={logOut}>Logout</div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
