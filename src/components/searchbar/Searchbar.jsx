import styles from "./searchbar.module.css";
import { IoIosSearch } from "react-icons/io";

export default function Searchbar() {
  return (
    <div className={styles.container}>
      <IoIosSearch />
      <input type="text" placeholder="Search" />
    </div>
  );
}
