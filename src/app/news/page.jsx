"use client";
import styles from "./page.module.css";
import Spinner from "../../components/spinner/Spinner";
import { getAllOtherPosts } from "../../requests/requests";
import { useContext, useMemo } from "react";
import { SearchContext } from "../../context/SearchContext";

export default function News() {
  const slug = "news";
  const { data, isLoading } = getAllOtherPosts(slug);

  const { data: search } = useContext(SearchContext);

  const searchItems = useMemo(
    () =>
      data?.filter((p) => {
        return p.text.toLowerCase().includes(search.text.toLowerCase());
      }),
    [data, search]
  );

  if (isLoading) return <Spinner />;
  return (
    <div className="wrapper">
      <div className={styles.container}>
        {searchItems?.map((post) => (
          <div className={styles.post} key={post._id}>
            {post.image && (
              <div className={styles.imgContainer}>
                <img src={post.image} alt="" className={styles.img} />
              </div>
            )}
            <div className={styles.content}>{post.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
