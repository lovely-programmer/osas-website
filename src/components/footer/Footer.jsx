import Link from "next/link";
import styles from "./footer.module.css";
import { IoChatbubblesOutline, IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineSchool, MdOutlineWorkOutline } from "react-icons/md";

export default function Footer() {
  return (
    <>
      <div className={styles.top}></div>
      <div className={styles.footer}>
        <div className="wrapper">
          <div className={styles.footerContainer}>
            <div>
              <IoChatbubblesOutline />
              <Link href="">Customer Care</Link>
            </div>
            <div>
              <MdOutlineWorkOutline />
              <Link href="">Skill or Service</Link>
            </div>
            <div>
              <IoNewspaperOutline />
              <Link href="">News</Link>
            </div>
            <div>
              <MdOutlineSchool />
              <Link href="">School Materials</Link>
            </div>
            <div>
              <MdOutlineSchool />
              <Link href="">Students Market</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
