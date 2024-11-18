"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Carousel from "../../components/carousel/Carousel";
import { getAUser } from "../../requests/requests";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Connect() {
  const [allUser, setAllUser] = useState(null);
  const { user } = getAUser();
  const router = useRouter();

  useEffect(() => {
    const getAllUser = async () => {
      const res = await fetch("/api/user/allUser", {
        cache: "no-cache",
      });
      const data = await res.json();
      setAllUser(data);
    };
    getAllUser();
  }, []);

  const filterUser = allUser?.filter((u) => u.id !== user.id);

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
    <>
      <Carousel carousel="/banner_2.jpg" />
      <div className="wrapper">
        <div className={styles.container}>
          {filterUser?.map((users) => (
            <div key={users.id} className={styles.postsContainer}>
              <div className={styles.posts}>
                <div className={styles.profile}>
                  <div>
                    <Image
                      src={users.image}
                      width={50}
                      height={50}
                      className={styles.profileImg}
                    />{" "}
                    {users.name}
                  </div>
                  {users.institution && (
                    <div className={styles.school}>
                      School of Study: {users.institution}
                    </div>
                  )}
                  {users?.department && (
                    <div className={styles.course}>
                      Department: {users.department}
                    </div>
                  )}
                  {users?.skills && (
                    <div className={styles.course}>Skill: {users.skills}</div>
                  )}
                </div>
                <button
                  className={styles.button}
                  onClick={() => handleSelect(users)}
                >
                  {/* Message */}
                  Ask me any questions on my Discipline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
