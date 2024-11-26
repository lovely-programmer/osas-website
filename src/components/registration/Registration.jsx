"use client";
import { useEffect, useState } from "react";
import styles from "./registration.module.css";
import { useSession } from "next-auth/react";
import Spinner from "../spinner/Spinner";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getAUser } from "../../requests/requests";

export default function Registration() {
  const { user } = getAUser();
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [skills, setSkills] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   if (user?.country == null) {
  //     router.push("/signup/post");
  //   }
  // }, [user?.country]);

  const [isLoading, setIsLoading] = useState(false);

  const { data } = useSession();

  const email = data?.user?.email;

  const userData = {
    institution,
    department,
    skills,
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
      body: JSON.stringify(userData),
    });

    if (res.status == 201) {
      await setDoc(doc(db, "userChats", data.user?.email), {});
      router.push("/signup/post");
    } else {
      setIsLoading(false);
      toast.error("something went wrong");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.registration}>
        <h2>Welcome to student support, kindly fill in your info</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formgroup}>
            <label htmlFor="institution">
              Institution and Department (Necessary for student but optional for
              non-student)
            </label>
            <input
              placeholder="e.g University of Benin"
              required={department !== ""}
              type="text"
              id="institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            {/* <label htmlFor="department">
              Department (University student only)
            </label> */}
            <input
              placeholder="e.g Department of Mechanical Engineering"
              required={institution !== ""}
              type="text"
              // id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="skill">
              Skill/occupation (optional for student but necessary for
              non-student)
            </label>
            <input
              placeholder="e.g Web developer"
              required={institution === "" && department === ""}
              type="text"
              id="skill"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
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
    </div>
  );
}
