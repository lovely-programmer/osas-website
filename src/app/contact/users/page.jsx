"use client";
import { toast } from "react-toastify";
import styles from "../page.module.css";
import { useState } from "react";
import { getAllUser } from "../../../requests/requests";

export default function ContactUsers() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const { allUser } = getAllUser();

  const emails = allUser?.map((users) => users.email);

  const sendMail = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/user/contact`, {
      method: "POST",
      body: JSON.stringify({
        subject,
        message,
        emails,
      }),
    });

    if (res.status === 201) {
      toast.success("message sent successfully");
    } else {
      toast.error("Something went wrong");
    }

    setSubject("");
    setMessage("");
  };

  return (
    <div className="wrapper">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.right}>
            <h2>Get in touch</h2>
            <form onSubmit={sendMail}>
              <div className={styles.form__group}>
                <input
                  type="text"
                  name="subject"
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  value={subject}
                />
                <label htmlFor="">Your Subject</label>
              </div>
              <div className={styles.form__group}>
                <textarea
                  placeholder="Your message"
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  name="message"
                  id=""
                  cols="30"
                  rows="10"
                  value={message}
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
