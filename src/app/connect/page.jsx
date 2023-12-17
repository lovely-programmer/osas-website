import Posts from "../../components/posts/Posts";
import styles from "./page.module.css";

export default function page() {
  return (
    <div className="wrapper">
      <div className={styles.container}>
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
      </div>
    </div>
  );
}
