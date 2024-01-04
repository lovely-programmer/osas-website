"use client";
import Link from "next/link";
import styles from "./footer.module.css";
import { IoChatbubblesOutline, IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineSchool, MdOutlineWorkOutline } from "react-icons/md";
import { RiShoppingBasketLine } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { getAUser } from "../../requests/requests";

export default function Footer() {
  const { status } = useSession();
  const { user } = getAUser();
  return (
    <>
      {status === "authenticated" && user?.createdSuccessfully == true && (
        <div className={styles.top}></div>
      )}
      {status === "authenticated" && user?.createdSuccessfully == true && (
        <div className={styles.footer}>
          <div className="wrapper">
            <div className={styles.footerContainer}>
              <div>
                <IoChatbubblesOutline />
                <Link href="">Customer Care</Link>
              </div>
              <div>
                <Link href="/posts/skills">
                  <MdOutlineWorkOutline />
                </Link>
                <Link href="/posts/skills">Skill or Service</Link>
              </div>
              <div className={styles.ballDiv}>
                <IoNewspaperOutline />
                <Link className={styles.news} href="">
                  News
                </Link>
                <div className={styles.ball}>10</div>
              </div>
              <div className={styles.ballDiv}>
                <MdOutlineSchool />
                <Link href="" className={styles.materials}>
                  School Materials
                </Link>
                <div className={styles.ball}>20</div>
              </div>
              <div className={styles.ballDiv}>
                <Link href="/posts/studentmarket">
                  <RiShoppingBasketLine />
                </Link>
                <Link href="/posts/studentmarket">Students Market</Link>
                <div className={styles.ball}>50</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
