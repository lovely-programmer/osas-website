"use client";
import { useState } from "react";
import styles from "./post.module.css";
import { useRouter } from "next/navigation";

export default function Post() {
  const [select, setSelect] = useState("");
  const router = useRouter();
  const goToPost = (e) => {
    e.preventDefault();
    if (select == "need") router.push("/post/tradepost");
    if (select == "skills") router.push("/post/skills");
    if (select == "usedItem") router.push("/post/usedItems");
    if (select == "market") router.push("/post/studentmarket");
  };

  return (
    <div className="wrapper">
      <div className={styles.container}>
        <div className={styles.postContainer}>
          <h1>What Do you want to post about?</h1>
          <form onSubmit={goToPost}>
            <select
              onChange={(e) => setSelect(e.target.value)}
              name=""
              id=""
              required
            >
              <option value="">Select</option>
              <option value="need">Your Need</option>
              <option value="skills">Skill or Service</option>
              <option value="usedItem">Free Used Item</option>
              <option value="market">Your Market</option>
            </select>
            <button>Go To Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}
