"use client";
import Link from "next/link";
import styles from "./navbar.module.css";
import { useSession } from "next-auth/react";

export default function WelcomeNav() {
  const { status } = useSession();
  return (
    <div className={styles.navbar}>
      <div className="wrapper">
        <div className={styles.container}>
          <Link className={styles.logo_1} href="">
            <span>Student</span>
            <span>Support</span>
          </Link>
          {status === "unauthenticated" && (
            <Link href="/signin" className={styles.login}>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
