"use client";
import { useContext, useState } from "react";
import styles from "./searchbox.module.css";
import { IoIosSearch } from "react-icons/io";
import { SearchContext } from "../../context/SearchContext";

export default function Searchbox() {
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
      <IoIosSearch />
      <input
        value={query}
        onChange={handleChange}
        type="search"
        placeholder="Search"
      />
    </div>
  );
}
