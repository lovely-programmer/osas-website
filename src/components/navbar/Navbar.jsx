"use client";
import Link from "next/link";
import styles from "./navbar.module.css";
import AuthLinks from "../authlinks/AuthLinks";
import { RiMessengerLine } from "react-icons/ri";
import Searchbox from "../searchbox/Searchbox";
import { VscDebugDisconnect } from "react-icons/vsc";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useSession } from "next-auth/react";
import { getAUser } from "../../requests/requests";

export default function Navbar() {
  const { status } = useSession();
  const { user } = getAUser();

  return (
    <div className={styles.navbar}>
      <div className="wrapper">
        <div className={styles.container}>
          {status === "authenticated" && user?.createdSuccessfully == true ? (
            <Link className={styles.logo} href="/">
              <span>Student</span>
              <span>Support</span>
            </Link>
          ) : (
            <Link className={styles.logo_1} href="">
              <span>Student</span>
              <span>Support</span>
            </Link>
          )}

          {status === "authenticated" && user?.createdSuccessfully == true && (
            <div className={styles.links}>
              <Link className={styles.messageLink} href="/message">
                <RiMessengerLine />
                <div className={styles.ball}>6</div>
                <span>Message</span>
              </Link>
              <Link className={styles.messageLink} href="/connect">
                <VscDebugDisconnect />
                <span>Connect</span>
              </Link>
              {/* <div className={styles.giveaway}>
              <LiaHandsHelpingSolid />
              <Link href="/posts/"></Link>
              <div className={styles.giveLink}>Giveaway</div>
            </div> */}
              <Link className={styles.messageLink} href="/posts/freeuseditems">
                <MdOutlineShoppingBag />
                <div className={styles.ball}>2</div>
                <span>Giveaway</span>
              </Link>
            </div>
          )}
          <Searchbox />
          <AuthLinks />
        </div>
      </div>
    </div>
  );
}
