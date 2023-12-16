import Image from "next/image"
import styles from "./posts.module.css"

export default function Posts() {
  return (
    <div className="wrapper">
      <div className={styles.postsContainer}>
        <div className={styles.posts}>
          <div className={styles.profile}>
            <div>
              <Image src="/profile.png" width={50} height={50} className={styles.profileImg} /> John Doe
            </div>
            <div className={styles.trade}>
              My Trade: Web Developer
            </div>
          </div>
          <div className={styles.tradeImgContainer}>
            <Image src="/banner_1.jpg" alt="" fill className={styles.tradeImg} />
          </div>
          <div className={styles.needs}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, voluptate?
          </div>
          <button className={styles.button}>Message</button>
        </div>
      </div>
    </div>
  )
}