import { IoIosSearch } from "react-icons/io";
import styles from "./searchbar.module.css";
import { IoClose } from "react-icons/io5";

export default function Searchbar({ showSearchBar, setShowSearchBar }) {
  return (
    <div className={styles.container}>
      <div className={styles.close}>
        <IoClose onClick={() => setShowSearchBar(!showSearchBar)} />
      </div>
      <div className={styles.searchContainer}>
        <IoIosSearch />
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
}
