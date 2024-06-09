"use client";
import { useState } from "react";
import styles from "./post.module.css";
import { useRouter } from "next/navigation";
import { getAUser } from "../../requests/requests";

export default function Post() {
  const { user } = getAUser();
  const [select, setSelect] = useState("");
  const router = useRouter();
  const goToPost = (e) => {
    e.preventDefault();
    if (select == "need") router.push("/post/tradepost");
    if (select == "skills") router.push("/post/skills");
    if (select == "usedItem") router.push("/post/usedItems");
    if (select == "market") router.push("/post/studentmarket");
    if (select == "rent") router.push("/post/rent");
    if (select == "giveaway") router.push("/post/giveaway");
    if (select == "news") router.push("/post/news");
  };

  const checkSubscribed = () => {
    router.push("/subscribe");
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
              <option onClick={checkSubscribed} value="skills">
                Skill or Service
              </option>
              <option value="usedItem">Free Used Item</option>
              <option onClick={checkSubscribed} value="market">
                Your Market
              </option>
              <option onClick={checkSubscribed} value="rent">
                Rent
              </option>
              {user.admin == true && <option value="giveaway">Giveaway</option>}
              {user.admin == true && <option value="news">News</option>}
            </select>
            <button>Go To Post</button>
          </form>

          <div className={styles.note}>
            Student Support offers free access to limitless post in need (Trade
            by barter) post. You can exchange goods, items and services as you
            want in accordance to your choice.
            <span>Note</span>
            <div className={styles.p2}>
              Posting in the other section such as skill/Services, market, rent;
              a one time monthly subscription of ₦1000 is needed.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
