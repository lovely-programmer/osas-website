"use client";
import { getAUser } from "../../requests/requests";
import styles from "./page.module.css";
import { useRef } from "react";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const form = useRef();
  const { user } = getAUser();
  const sendMail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_m2zkreq",
        "template_lmifd7p",
        form.current,
        "user_AnjF4Y8dbderf60LOsMSF"
      )
      .then(
        (result) => {
          e.target.reset();
          console.log(result.text);
          toast.success("message sent successfully");
        },
        (error) => {
          console.log(error.text);
          toast.error(error.text);
        }
      );
  };

  return (
    <div className="wrapper">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <img src="./email.gif" alt="" />
          </div>
          <div className={styles.right}>
            <h2>Get in touch</h2>
            <form ref={form} onSubmit={sendMail}>
              <div className={styles.form__group}>
                <input value={user?.name} type="text" name="user_name" />
                <label htmlFor="">Name</label>
              </div>
              <div className={styles.form__group}>
                <input
                  value={user?.email}
                  type="email"
                  required
                  name="user_email"
                />
                <label htmlFor="">Email</label>
              </div>
              <div className={styles.form__group}>
                <input type="text" name="user_subject" required />
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
