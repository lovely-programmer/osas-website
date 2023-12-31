"use client";
import { useContext, useEffect } from "react";
import styles from "./post.module.css";
import { MultiplePageContext } from "../../context/MultiplePageContext";
import GoogleSignin from "../../components/registration/GoogleSignin";
import Registration from "../../components/registration/Registration";
import Post from "../../components/registration/Post";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Signin() {
  const { multiplePage, currentIndex, next, step } =
    useContext(MultiplePageContext);

  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }

  useEffect(() => {
    multiplePage([
      <GoogleSignin next={next} />,
      <Registration next={next} />,
      <Post />,
    ]);
  }, [currentIndex]);

  return <div className={styles.container}>{step}</div>;
}
