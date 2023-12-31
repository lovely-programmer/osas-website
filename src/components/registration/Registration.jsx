"use client";
import { useState } from "react";
import styles from "./registration.module.css";
import { useSession } from "next-auth/react";
import Spinner from "../spinner/Spinner";

export default function Registration({ next }) {
  const [institution, setInstitution] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { data } = useSession();

  const email = data?.user?.email;

  const user = {
    institution,
    dob,
    phoneNumber,
    whatsappNumber,
    age,
    country,
    state,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch(`/api/user/${email}`, {
      method: "PUT",
      body: JSON.stringify({ user }),
    });

    const data = await res.json();

    console.log(res.status);

    console.log(data);

    if (res.status == 201) {
      next();
    } else {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.registration}>
      <h2>Welcome to student support, kindly fill in your info</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formgroup}>
          <label htmlFor="institution">Institution</label>
          <input
            placeholder="e.g University of Benin"
            required
            type="text"
            id="institution"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="date">Date of Birth</label>
          <input
            required
            type="date"
            id="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="phone">Phone Number</label>
          <input
            required
            type="text"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="whats">Whatsapp</label>
          <input
            required
            type="text"
            id="whats"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="age">Age</label>
          <input
            required
            type="text"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="country">Country</label>
          <input
            required
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="state">State</label>
          <input
            required
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className={styles.buttons}>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
