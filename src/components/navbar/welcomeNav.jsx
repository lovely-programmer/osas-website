"use client";
import Link from "next/link";
import styles from "./navbar.module.css";

export default function WelcomeNav() {
  return (
    <div className={styles.navbar}>
      <div className="wrapper">
        <div className={styles.container}>
          <Link className={styles.logo_1} href="">
            <span>Student</span>
            <span>Support</span>
          </Link>

          <Link href="/signin" className={styles.login}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
