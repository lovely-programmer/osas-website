import Image from "next/image";
import Searchbar from "../../components/searchbar/Searchbar";
import styles from "./page.module.css";

export default function Message() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h4>Chats</h4>
        <Searchbar />
        <div>
          <span>All Chats</span>
          <div className={styles.profile}>
            <div>
              <Image
                src="/profile.png"
                width={50}
                height={50}
                className={styles.profileImg}
              />
              <div className={styles.personContainer}>
                <span>John Doe</span>
                <div className={styles.person}>Hello what's up and going</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}></div>
    </div>
  );
}
