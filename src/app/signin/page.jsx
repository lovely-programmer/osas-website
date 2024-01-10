"use client";
import styles from "./post.module.css";
import GoogleSignin from "../../components/registration/GoogleSignin";

export default function Signin() {
  return (
    <div className={styles.container}>
      <GoogleSignin />
    </div>
  );
}
