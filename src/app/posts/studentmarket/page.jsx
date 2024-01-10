"use client";
import Image from "next/image";
import styles from "../post.module.css";
import { getAllOtherPosts } from "../../../requests/requests";
import Spinner from "../../../components/spinner/Spinner";
import Carousel from "../../../components/carousel/Carousel";

export default function StudentMarket() {
  const slug = "market";
  const { data, isLoading } = getAllOtherPosts(slug);
  if (isLoading) return <Spinner />;
  return (
    <>
      <Carousel carousel="/jane.jpg" />
      <div className="wrapper">
        <div className={styles.container}>
          {data &&
            data?.map((post) => (
              <div className={styles.post}>
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
                  <div className={styles.box_1}>My Market: {post.market}</div>
                </div>
                <div className={styles.imgContainer}>
                  <Image src={post.image} alt="" fill className={styles.img} />
                </div>
                <div className={styles.about}>{post.aboutMarket}</div>
                <button className={styles.button}>Message</button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
