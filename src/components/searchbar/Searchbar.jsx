import { IoIosSearch } from "react-icons/io";
import styles from "./searchbar.module.css";

export default function Searchbar() {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <IoIosSearch />
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
}
