import styles from "./page.module.css";

export default function Contact() {
  const sendMail = () => {};
  return (
    <div className="wrapper">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <img src="./email.gif" alt="" />
          </div>
          <div className={styles.right}>
            <h2>Get in touch</h2>
            <form>
              <div className={styles.form__group}>
                <input type="text" name="user_name" required />
                <label htmlFor="">Name</label>
              </div>
              <div className={styles.form__group}>
                <input type="email" required name="user_email" />
                <label htmlFor="">Email</label>
              </div>
              <div className={styles.form__group}>
                <input type="text" required />
                <label htmlFor="">Your Subject</label>
              </div>
              <div className={styles.form__group}>
                <textarea
                  placeholder="Your message"
                  required
                  name="message"
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className={styles.form__group}>
                <button>Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
