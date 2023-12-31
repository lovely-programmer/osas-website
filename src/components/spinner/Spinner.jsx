import styles from "./spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
}
