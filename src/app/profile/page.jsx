"use client";
import styles from "./page.module.css";
import { getAUser, getAllOtherPosts, getPosts } from "../../requests/requests";
import Spinner from "../../components/spinner/Spinner";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import Post from "../../components/profilePost/Post";
import { app } from "../../utils/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function Profile() {
  const { user, isLoading } = getAUser();
  const [showProfile, setShowProfile] = useState(false);
  const [option, setOption] = useState("myneed");
  const { data } = getPosts();
  const myPosts = data?.filter((p) => p.user.id == user.id);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [username, setUsername] = useState(user.name);
  const [institution, setInstitution] = useState(user.institution);
  const [department, setDepartment] = useState(user?.department);
  const [skills, setSkills] = useState(user?.skills);
  const [dob, setDob] = useState(user.dob);
  const [image, setImage] = useState(user.image);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [whatsappNumber, setWhatsappNumber] = useState(user.whatsappNumber);
  const [age, setAge] = useState(user.age);
  const [country, setCountry] = useState(user.country);
  const [state, setState] = useState(user.state);
  const storage = getStorage(app);

  let slug =
    option == "skill"
      ? "skills"
      : option == "useditem"
      ? "usedItem"
      : option == "market"
      ? "market"
      : option == "rent"
      ? "rentItem"
      : option == "giveaway"
      ? "giveaway"
      : option == "news"
      ? "news"
      : "";

  const handleRequest = () => {
    let slug =
      option == "skill"
        ? "skills"
        : option == "useditem"
        ? "usedItem"
        : option == "market"
        ? "market"
        : option == "rent"
        ? "rentItem"
        : option == "giveaway"
        ? "giveaway"
        : option == "news"
        ? "news"
        : "";
    const { data } = getAllOtherPosts(slug);
    if (slug == "" || option == "myneed") return myPosts;
    return data?.filter((p) => p.user.id == user.id);
  };

  const posts = handleRequest();

  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleChange = (e) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const upload = () => {
      const name = new Date().getTime() + image.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await fetch("/api/user/image", {
              method: "PUT",
              body: JSON.stringify(downloadURL),
            });
          });
        }
      );
    };

    if (previewImage) {
      upload();
      toast.success("Image Updated Successfully");
    }
  }, [previewImage]);

  const userData = {
    name: username,
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

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch(`/api/user/${user.email}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });

    if (res.status == 201) {
      toast.success("Profile updated successfully");
      setLoading(false);
    }

    if (res.ok) {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.imgContainer}>
          <label htmlFor="profileImg">
            <FaCamera />
          </label>
          <input
            accept="image/png, image/gif, image/jpeg"
            onChange={handleChange}
            className={styles.profileFile}
            type="file"
            id="profileImg"
          />
          <img src={previewImage || user.image} alt="" />
        </div>
        <span>{user.name}</span>
        <button className={styles.editButton} onClick={handleShowProfile}>
          {showProfile ? "Show Posts" : "Edit Profile"}
        </button>
      </div>

      {showProfile && (
        <div className={styles.profileWrapper}>
          <div className={styles.formgroup}>
            <span>Name</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <span>Institution</span>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <span>Department</span>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <span>Skills/Occupation</span>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <span>Date of Birth</span>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <span>Age</span>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <span>Phone Number</span>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <span>Whatsapp Number</span>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <span>Country</span>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <span>State</span>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <div className={styles.buttonContainer}>
            <button onClick={handleSubmit} className={styles.button}>
              Submit
            </button>
          </div>
        </div>
      )}

      {!showProfile && (
        <div className={styles.postsContainer}>
          <select onChange={(e) => setOption(e.target.value)}>
            <option value="myneed">My Need</option>
            <option value="skill">Skill or Service</option>
            <option value="useditem">Free Used Item</option>
            <option value="market">My Market</option>
            <option value="rent">Rent</option>
            {user.admin == true && <option value="giveaway">Giveaway</option>}
            {user.admin == true && <option value="news">News</option>}
          </select>
          {isLoading && "Loading..."}
          {posts?.map((post) => (
            <Post
              key={post.id}
              previewImage={previewImage}
              post={post}
              option={option}
              slug={slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
