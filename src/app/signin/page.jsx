"use client";
import styles from "./post.module.css";
import GoogleSignin from "../../components/registration/GoogleSignin";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Signin() {
  const { status } = useSession();
  const router = useRouter();

  // if (status === "authenticated") {
  //   router.push("/");
  // }

  return (
    <div className={styles.container}>
      <GoogleSignin />
    </div>
  );
}
