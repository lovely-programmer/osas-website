"use client";
import { useContext, useEffect } from "react";
import styles from "./post.module.css";
import { MultiplePageContext } from "../../context/MultiplePageContext";
import GoogleSignin from "../../components/registration/GoogleSignin";
import Registration from "../../components/registration/Registration";
import Post from "../../components/registration/Post";
import { useSession } from "next-auth/react";
import { getAUser } from "../../requests/requests";
import { useRouter } from "next/navigation";
import Spinner from "../../components/spinner/Spinner";

export default function Signin() {
  const { multiplePage, currentIndex, next, step } =
    useContext(MultiplePageContext);

  const { user, isLoading } = getAUser();
  const router = useRouter();

  if (user?.createdSuccessfully) router.push("/");

  if (isLoading) {
    return <Spinner />;
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
