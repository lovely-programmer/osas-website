import Link from "next/link";
import styles from "./navbar.module.css";
import AuthLinks from "../authlinks/AuthLinks";
import { RiMessengerLine } from "react-icons/ri";
import Searchbar from "../searchbar/Searchbar";
import { VscDebugDisconnect } from "react-icons/vsc";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { MdOutlineShoppingBag } from "react-icons/md";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className="wrapper">
        <div className={styles.container}>
          <Link className={styles.logo} href="/">
            <span>Student</span>
            <span>Support</span>
          </Link>
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
            <div className={styles.giveaway}>
              <LiaHandsHelpingSolid />
              <div className={styles.giveLink}>Giveaway</div>
            </div>
            <Link className={styles.messageLink} href="/freeuseditem">
              <MdOutlineShoppingBag />
              <div className={styles.ball}>2</div>
              <span>Free used item</span>
            </Link>
          </div>
          <Searchbar />
          <AuthLinks />
        </div>
      </div>
    </div>
  );
}
