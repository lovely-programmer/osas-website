import styles from "./searchbox.module.css";
import { IoIosSearch } from "react-icons/io";

export default function Searchbox() {
  return (
    <div className={styles.container}>
      <IoIosSearch />
      <input type="text" placeholder="Search" />
    </div>
  );
}
