"use client";
import Image from "next/image";
import styles from "./posts.module.css";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { getAUser } from "../../requests/requests";
import { useRouter, usePathname } from "next/navigation";
import { useContext } from "react";
import { ImageContext } from "../../context/ImageContext";

export default function Posts({ post }) {
  const { user } = getAUser();
  const { dispatch } = useContext(ImageContext);
  const router = useRouter();
  const pathname = usePathname();

  const showImagePage = () => {
    const data = { id: post.id, image: post.image, pathname };
    dispatch({
      type: "VIEW_IMAGE",
      payload: data,
    });
    localStorage.setItem("pathname", pathname);
    router.push(`/post/${post.id}`);
  };

  const handleSelect = async (messageUser) => {
    // check whether the group(chats in firestore) exits, if not create
    const combinedId =
      user.id > messageUser.id
        ? user.id + messageUser.id
        : messageUser.id + user.id;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        // create chat in chat collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, "userChats", user.email), {
          [combinedId + ".userInfo"]: {
            id: messageUser.id,
            name: messageUser.name,
            image: messageUser.image,
            email: messageUser.email,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", messageUser.email), {
          [combinedId + ".userInfo"]: {
            id: user.id,
            name: user.name,
            image: user.image,
            email: user.email,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      router.push("/message");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="wrapper">
      <div className={styles.fullImageContainer}></div>
      <div className={styles.postsContainer}>
        <div className={styles.posts}>
          <div className={styles.profile}>
            <div>
              <Image
                src={post.user.image}
                width={50}
                height={50}
                className={styles.profileImg}
              />
              {post.user.name}
            </div>
            <div className={styles.trade}>
              <span>My Trade:</span> {post.myTrade}
            </div>
          </div>
          <div className={styles.tradeImgContainer}>
            <div className={styles.imgContainer}>
              <img onClick={() => showImagePage()} src={post.image} alt="" />
            </div>
          </div>
          <div className={styles.needs}>
            <span>MY EXCHANGE NEEDS </span>
            <div style={{ whiteSpace: "pre-wrap", lineHeight: "24px" }}>
              {post.myNeed}
            </div>
          </div>
          {user.id !== post.user.id && (
            <button
              onClick={() => handleSelect(post.user)}
              className={styles.button}
            >
              Message
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
