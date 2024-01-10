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
import { useRouter } from "next/navigation";

export default function Posts({ post }) {
  const { user } = getAUser();
  const router = useRouter();
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
    } catch (error) {}
    router.push("/message");
  };
  return (
    <div className="wrapper">
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
            <div className={styles.trade}>My Trade: {post.myTrade}</div>
          </div>
          <div className={styles.tradeImgContainer}>
            <Image src={post.image} alt="" fill className={styles.tradeImg} />
          </div>
          <div className={styles.needs}>
            <span>MY NEEDS </span>
            <div>{post.myNeed}</div>
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
