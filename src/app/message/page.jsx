import styles from "./page.module.css";
import Sidebar from "../../components/message/sidebar/Sidebar";

export default function Message() {
  return (
    <div className={styles.container}>
      <Sidebar />
    </div>
  );
}
