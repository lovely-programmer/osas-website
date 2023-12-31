import Image from "next/image";
import styles from "./posts.module.css";

export default function Posts({ post }) {
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
          <button className={styles.button}>Message</button>
        </div>
      </div>
    </div>
  );
}
