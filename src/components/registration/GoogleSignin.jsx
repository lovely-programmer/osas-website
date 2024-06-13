"use client";
import { useRouter } from "next/navigation";
import styles from "./registration.module.css";
import { signIn, useSession } from "next-auth/react";
import { getAUser } from "../../requests/requests";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";

export default function GoogleSignin({ next }) {
  const router = useRouter();
  const { status } = useSession();
  const { user, isLoading } = getAUser();
  const [statusLoading, setStatusLoading] = useState(false);

  if (user) {
    if (isLoading) {
      setStatusLoading(true);
      return <Spinner />;
    }
  }

  if (status === "authenticated" && user) {
    if (isLoading) {
      setStatusLoading(true);
      return <Spinner />;
    }
    if (user?.country == null && user?.createdSuccessfully == false)
      router.push("/signup/welcome");
    if (user?.createdSuccessfully) router.push("/");
  }

  const handleSubmit = () => {
    setStatusLoading(true);
    signIn("google");
  };

  if (status === "authenticated") {
    return <Spinner />;
  }

  return (
    <div className={styles.googleContainer}>
      <div className={styles.wrapper}>
        <button
          disabled={statusLoading}
          className={styles.socialButton}
          onClick={handleSubmit}
        >
          <img src="./google.png" alt="" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
