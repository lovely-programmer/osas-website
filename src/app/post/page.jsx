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
    if (select == "giveaway") router.push("/post/giveaway");
    if (select == "news") router.push("/post/news");
    if (select == "usedItem") router.push("/post/usedItems");

    if (user.subscribed == false && select == "market") {
      router.push("/subscribe");
    } else if (user.subscribed && select == "market") {
      router.push("/post/studentmarket");
    }
    if (user.subscribed == false && select == "skills") {
      router.push("/subscribe");
    } else if (user.subscribed && select == "skills") {
      router.push("/post/skills");
    }
    if (user.subscribed == false && select == "rent") {
      router.push("/subscribe");
    } else if (user.subscribed && select == "rent") {
      router.push("/post/rent");
    }
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
              <option value="usedItem">Free Used Item</option>
              <option value="skills">
                Skill or Service{" "}
                <span style={{ color: "#e7700d" }}>(Premium)</span>
              </option>
              <option value="market">
                Your Market <span style={{ color: "#e7700d" }}>(Premium)</span>
              </option>
              <option value="rent">
                Rent <span style={{ color: "#e7700d" }}>(Premium)</span>
              </option>
              {user?.admin == true && (
                <option value="giveaway">Giveaway</option>
              )}
              {user?.admin == true && <option value="news">News</option>}
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
