import Image from "next/image"
import styles from "./carousel.module.css"

export default function Carousel() {
  return (
    <div className={styles.imgContainer}>
      <div className={styles.img}>
        <Image src="/jane.jpg" alt="" fill className={styles.image} />
      </div>
    </div>
  )
}