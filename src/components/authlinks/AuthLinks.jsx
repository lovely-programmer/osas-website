"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./authLinks.module.css";
import { IoIosSearch } from "react-icons/io";
import Searchbar from "../searchbar/Searchbar";
import { signOut, useSession } from "next-auth/react";
import Spinner from "../spinner/Spinner";
import { getAUser } from "../../requests/requests";

export default function AuthLinks() {
  const { status } = useSession();
  const { user } = getAUser();

  const [open, setOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [loading, setLoading] = useState(false);

  const logOut = () => {
    setLoading(true);
    signOut();
    setShowSearchBar(!showSearchBar);
    localStorage.setItem("currentIndex", 0);
  };

  if (loading) return <Spinner />;

  console.log(status);

  return (
    <>
      {status === "authenticated" && user?.createdSuccessfully == true && (
        <>
          <div className={styles.container}>
            <Link className={styles.link} href="/post">
              Post
            </Link>
            {user.admin && <Link href="/contact/users">Contact Users</Link>}
            <Link className={styles.link} href="/subscribe">
              Subscribe
            </Link>
            <div onClick={logOut}>Logout</div>
            <Link href="/profile" className={styles.profileImg}>
              <img src={user?.image} alt="" />
            </Link>
          </div>
        </>
      )}

      {status === "authenticated" && user?.createdSuccessfully == true && (
        <div className={styles.burgerContainer}>
          <IoIosSearch onClick={() => setShowSearchBar(!showSearchBar)} />
          <div className={styles.burger} onClick={() => setOpen(!open)}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
        </div>
      )}

      {showSearchBar && (
        <Searchbar
          showSearchBar={showSearchBar}
          setShowSearchBar={setShowSearchBar}
        />
      )}

      {open && (
        <div className={styles.responsiveMenu}>
          <div className={`wrapper ${styles.menu}`}>
            {status !== "unauthorized" && (
              <>
                <div className={styles.menuContainer}>
                  {user.admin && (
                    <Link href="/contact/users" onClick={() => setOpen(!open)}>
                      Contact Users
                    </Link>
                  )}
                  <Link href="/subscribe" onClick={() => setOpen(!open)}>
                    Subscribe
                  </Link>
                  <Link href="/post" onClick={() => setOpen(!open)}>
                    Post
                  </Link>
                  <Link href="/profile" onClick={() => setOpen(!open)}>
                    Profile
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
