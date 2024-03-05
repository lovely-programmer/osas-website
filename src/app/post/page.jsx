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
    if (select == "rent") router.push("/post/rent");
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
              <option value="rent">Rent</option>
            </select>
            <button>Go To Post</button>
          </form>

          <div className={styles.note}>
            Student Support offers free access to limitless post in need (Trade
            by barter) post. You can exchange goods, items and services as you
            want in accordance to your choice.
            <span>Note</span>
            <div className={styles.p2}>
              Posting in the other section such as skill or services, free used
              item, your market, rent; a one time monthly subscription of ₦1000
              is needed.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
