import Image from "next/image";
import styles from "./carousel.module.css";

export default function Carousel({ carousel }) {
  return (
    <div className={styles.imgContainer}>
      <div className={styles.img}>
        <Image src={carousel} alt="" fill className={styles.image} />
      </div>
    </div>
  );
}
