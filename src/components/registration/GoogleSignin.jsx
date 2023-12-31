"use client";
import { useRouter } from "next/navigation";
import styles from "./registration.module.css";
import { signIn, useSession } from "next-auth/react";
import { getData } from "../../requests/requests";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";

export default function GoogleSignin({ next }) {
  const router = useRouter();
  const { data, status } = useSession();

  const email = data?.user?.email;

  const { user, isLoading } = getData(email);

  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    if (status === "loading") {
      setStatusLoading(true);
    } else {
      setStatusLoading(false);
    }

    if (status === "authenticated") {
      if (user == false) next();
      if (user == true) router.push("/");
    }
  }, [status, user]);

  const handleSubmit = () => {
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
