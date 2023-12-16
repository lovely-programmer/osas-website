"use client";

import { multiplePage } from "../../utils/multiplePage";
import styles from "./page.module.css";

export default function Registration() {
  const { pages } = multiplePage(
    <div>hello</div>,
    <div>hi</div>,
    <div>handsome</div>
  );

  console.log({ ...pages });

  return (
    <div className="wrapper">
      <div className={styles.container}>
        <h2>Welcome to student support, kindly fill in your info</h2>
        <div className={styles.form}>
          <div className={styles.formgroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="institution">Institution</label>
            <input type="text" id="institution" />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="date">Date of Birth</label>
            <input type="date" id="date" />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="phone">Phone Number</label>
            <input type="text" id="phone" />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="whats">Whatsapp</label>
            <input type="text" id="whats" />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="age">Age</label>
            <input type="text" id="age" />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="country">Country</label>
            <input type="text" id="country" />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="state">State</label>
            <input type="text" id="state" />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="profile">Profile Picture</label>
            <input type="file" id="profile" />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" />
          </div>
          <div className={styles.buttons}>
            <button>Prev</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
