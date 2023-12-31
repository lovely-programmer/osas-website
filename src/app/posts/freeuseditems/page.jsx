"use client";
import Image from "next/image";
import styles from "../post.module.css";
import { getAllOtherPosts } from "../../../requests/requests";
import Spinner from "../../../components/spinner/Spinner";

export default function FreeUsedItems() {
  const slug = "usedItem";
  const { data, isLoading } = getAllOtherPosts(slug);

  if (isLoading) return <Spinner />;
  return (
    <div className="wrapper">
      <div className={styles.container}>
        {data &&
          data?.map((post) => (
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
                  My free used item: {post.usedItem}
                </div>
              </div>
              <div className={styles.imgContainer}>
                <Image src={post.image} alt="" fill className={styles.img} />
              </div>
              <div className={styles.about}>{post.aboutItem}</div>
              <button className={styles.button}>Message</button>
            </div>
          ))}
      </div>
    </div>
  );
}
