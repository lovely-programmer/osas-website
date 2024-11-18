"use client";
import Link from "next/link";
import styles from "./navbar.module.css";
import AuthLinks from "../authlinks/AuthLinks";
import { RiMessengerLine } from "react-icons/ri";
import Searchbox from "../searchbox/Searchbox";
import { VscDebugDisconnect } from "react-icons/vsc";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useSession } from "next-auth/react";
import { getAUser, getSubscription } from "../../requests/requests";
import { IoNewspaperOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { status } = useSession();
  const { user } = getAUser();
  const { subscription } = getSubscription();
  const pathname = usePathname();
  const router = useRouter();
  const usedItemNotification = user?.usedItemNotification;
  const newsNotification = user?.newsNotification;
  const [chats, setChats] = useState();
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const unSubscribe = () => {
      subscription?.map(async (sub) => {
        if (
          new Date(subscription.subExpDate).getTime() >= new Date().getTime()
        ) {
          await fetch("/api/user/unsubscribe", {
            method: "PUT",
          });
        }
      });
    };

    unSubscribe();
  }, [user]);

  const setUsedItemNotificationDefault = async (slug) => {
    if (usedItemNotification > 0) {
      await fetch(`/api/notification/update/${slug}`, {
        method: "PUT",
      });
    }
  };

  const setNewsNotification = async (slug) => {
    if (newsNotification > 0) {
      await fetch(`/api/notification/update/${slug}`, {
        method: "PUT",
      });
    }
  };

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user?.email), (doc) => {
        setChats(doc.data());
      });
      return () => unsub();
    };
    user?.email && getChats();
  }, [user?.email]);

  useEffect(() => {
    const getData = () => {
      const count =
        chats &&
        Object.entries(chats)?.filter(
          (chat) => chat[1].unseenMessage?.data?.id !== user?.email
        );

      const unseenMessages = count?.map(
        (chat) => chat[1].unseenMessage?.data?.number
      );

      setMessage(unseenMessages);
    };
    getData();
  }, [chats]);

  const totalMessages =
    message && message.reduce((total, num) => total + num, 0);

  if (status === "unauthenticated") {
    router.push("/welcome");
  }

  return (
    <div className={styles.navbar}>
      <div className="wrapper">
        <div className={styles.container}>
          {status === "authenticated" && user?.createdSuccessfully == true ? (
            <Link className={styles.logo} href="/">
              <span>Student</span>
              <span>Support</span>
            </Link>
          ) : (
            <Link className={styles.logo_1} href="">
              <span>Student</span>
              <span>Support</span>
            </Link>
          )}

          {status === "authenticated" && user?.createdSuccessfully == true && (
            <div className={styles.links}>
              <Link className={styles.messageLink} href="/message">
                <RiMessengerLine />
                {totalMessages > 0 && (
                  <div className={styles.ball}>{totalMessages}</div>
                )}
                <span>Message</span>
              </Link>
              <Link className={styles.messageLink} href="/connect">
                <VscDebugDisconnect />
                <span>Connect</span>
              </Link>
              <Link
                className={styles.messageLink}
                href="/news"
                onClick={() => setNewsNotification("news")}
              >
                <IoNewspaperOutline />
                {newsNotification > 0 && (
                  <div className={styles.ballNews}>{newsNotification}</div>
                )}
                <span>News</span>
              </Link>
              <Link
                className={styles.messageLink}
                href="/posts/freeuseditems"
                onClick={() => setUsedItemNotificationDefault("usedItem")}
              >
                <MdOutlineShoppingBag />
                {usedItemNotification > 0 && (
                  <div className={styles.ball}>{usedItemNotification}</div>
                )}
                <span>Free used item</span>
              </Link>
            </div>
          )}
          {status === "authenticated" && user?.createdSuccessfully == true && (
            <Searchbox />
          )}
          <AuthLinks />
          {status === "unauthenticated" && pathname === "/welcome" && (
            <Link href="/signin" className={styles.login}>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
