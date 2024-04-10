"use client";
import { IoIosSearch } from "react-icons/io";
import styles from "./searchbar.module.css";
import { IoClose } from "react-icons/io5";
import { SearchContext } from "../../context/SearchContext";
import { useContext, useState } from "react";

export default function Searchbar({ showSearchBar, setShowSearchBar }) {
  const { dispatch } = useContext(SearchContext);
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    dispatch({
      type: "SEARCH_THINGS",
      payload: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.close}>
        <IoClose onClick={() => setShowSearchBar(!showSearchBar)} />
      </div>
      <div className={styles.searchContainer}>
        <IoIosSearch />
        <input
          value={query}
          onChange={handleChange}
          type="search"
          placeholder="Search"
        />
      </div>
    </div>
  );
}
