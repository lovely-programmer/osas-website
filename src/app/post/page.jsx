import styles from "./post.module.css";

export default function Post() {
  return (
    <div className="wrapper">
      <div className={styles.container}>
        <div className={styles.header}>My Trade Post</div>
        <div className={styles.listContainer}>
          <ul className={styles.questionList}>
            <li>Are you in need of anything?</li>
            <li>What are you in need of?</li>
            <li>
              Which trade, goods, skills or services, do you have that can be
              Exchange for{" "}
            </li>
          </ul>
        </div>
        <div className={styles.note}>
          <span>Note:</span>
          <ul>
            <li>
              Students Support is a Godly foundation, raised to help Students in
              all time
            </li>
            <li>
              Student Support helps you connect to people of similar needs by
              Exchanging goods, skills or services
            </li>
          </ul>
        </div>
        <div className={styles.form}>
          <div className={styles.previewImage}>Preview Image</div>
          <div className={styles.formgroup}>
            <label htmlFor="yourTrade">What's your Trade?</label>
            <input
              type="text"
              id="yourTrade"
              placeholder="What's your trade, goods, skills, services"
              required
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="yourNeed">What's your Need?</label>
            <input
              type="text"
              id="yourNeed"
              placeholder="What's your needs?"
              required
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="tradeImage">Trade Image</label>
            <input type="file" id="tradeImage" required />
          </div>
          <button className={styles.button}>Submit</button>
        </div>
      </div>
    </div>
  );
}
