"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import styles from "./authLinks.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import { RiMessengerLine } from "react-icons/ri";
import { VscDebugDisconnect } from "react-icons/vsc";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { MdOutlineShoppingBag } from "react-icons/md";
import Searchbar from "../searchbar/Searchbar";
import { IoIosSearch } from "react-icons/io";

export default function AuthLinks() {
  const { theme, toggle } = useContext(ThemeContext);

  const [open, setOpen] = useState(false);
  const status = "authorized";
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
            <div onClick={toggle}>Logout</div>
          </div>
        </>
      )}

      <div className={styles.burgerContainer}>
        <div className={styles.burger} onClick={() => setOpen(!open)}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </div>

      {open && (
        <div className={styles.responsiveMenu}>
          <div className={`wrapper ${styles.menu}`}>
            {/* <Link className={styles.messageLink} href="/message">
              <RiMessengerLine />
              <span>Message</span>
            </Link>
            <Link className={styles.messageLink} href="/connect">
              <VscDebugDisconnect />
              <span>Connect</span>
            </Link>
            <div className={styles.giveaway}>
              <LiaHandsHelpingSolid />
              <div className={styles.giveLink}>Giveaway</div>
            </div>
            <Link className={styles.messageLink} href="/freeuseditem">
              <MdOutlineShoppingBag />
              <span>Free used item</span>
            </Link> */}
            <div className={styles.searchContainer}>
              <IoIosSearch />
              <input type="text" placeholder="Search" />
            </div>
            {status !== "unauthorized" && (
              <>
                <div className={styles.menuContainer}>
                  <Link href="/message" onClick={() => setOpen(!open)}>
                    Subscribe
                  </Link>
                  <Link href="/post" onClick={() => setOpen(!open)}>
                    Post
                  </Link>
                  <div onClick={toggle}>Logout</div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
