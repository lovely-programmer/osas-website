"use client";
import Image from "next/image";
import styles from "../post.module.css";
import { getAUser, getAllOtherPosts } from "../../../requests/requests";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Spinner from "../../../components/spinner/Spinner";
import Carousel from "../../../components/carousel/Carousel";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useMemo } from "react";
import { ImageContext } from "../../../context/ImageContext";
import { SearchContext } from "../../../context/SearchContext";
import { db } from "../../../utils/firebase";

export default function Giveaway() {
  const { user } = getAUser();
  const slug = "giveaway";
  const { data, isLoading } = getAllOtherPosts(slug);
  // const posts = data?.filter((p) => p.user.id !== user.id);

  const { dispatch } = useContext(ImageContext);
  const router = useRouter();
  const pathname = usePathname();

  const { data: search } = useContext(SearchContext);

  const searchItems = useMemo(
    () =>
      data?.filter((p) => {
        return p.giveawayItem.toLowerCase().includes(search.text.toLowerCase());
      }),
    [data, search]
  );

  const showImagePage = (post) => {
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
    } catch (error) {}
    router.push("/message");
  };

  if (isLoading) return <Spinner />;
  return (
    <>
      <Carousel carousel="/jane.jpg" />
      <div className="wrapper">
        <div className={styles.container}>
          {searchItems?.map((post) => (
            <div className={styles.post} key={post._id}>
              <div className={styles.profile}>
                <div>
                  <Image
                    src={post.user.image}
                    width={50}
                    height={50}
                    className={styles.profileImg}
                  />{" "}
                  {post.user.name}
                </div>
                <div className={styles.box_1}>
                  <span>Giveaway item:</span> {post.giveawayItem}
                </div>
              </div>
              <div className={styles.imgContainer}>
                <Image
                  onClick={() => showImagePage(post)}
                  src={post.image}
                  alt=""
                  fill
                  className={styles.img}
                />
              </div>
              <div className={styles.about}>{post.aboutItem}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
