"use client";
import styles from "./page.module.css";
import { getAUser, getAllOtherPosts, getPosts } from "../../requests/requests";
import Spinner from "../../components/spinner/Spinner";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaDeleteLeft } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, isLoading } = getAUser();
  const [showProfile, setShowProfile] = useState(false);
  const [option, setOption] = useState("myneed");
  const { data } = getPosts();
  const myPosts = data?.filter((p) => p.user.id == user.id);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState(user.name);
  const [institution, setInstitution] = useState(user.institution);
  const [dob, setDob] = useState(user.dob);
  const [image, setImage] = useState(user.image);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [whatsappNumber, setWhatsappNumber] = useState(user.whatsappNumber);
  const [age, setAge] = useState(user.age);
  const [country, setCountry] = useState(user.country);
  const [state, setState] = useState(user.state);

  const handleRequest = () => {
    let slug =
      option == "skill"
        ? "skills"
        : option == "useditem"
        ? "usedItem"
        : option == "market"
        ? "market"
        : "";
    const { data } = getAllOtherPosts(slug);
    if (slug == "" || option == "myneed") return myPosts;
    return data?.filter((p) => p.user.id == user.id);
  };

  const posts = handleRequest();

  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this post!")) {
      await fetch(`/api/posts/${option}/${id}`, {
        method: "DELETE",
      }).then((response) => {
        console.log(response.status);
      });
    } else {
      console.log("Canceled");
    }
  };

  const userData = {
    name: username,
    institution,
    image,
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
      body: JSON.stringify({ userData }),
    });

    if (res.status == 201) {
      toast.success("Profile updated successfully");
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.imgContainer}>
          <img src={user.image} alt="" />
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
            <span>Profile image</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
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
          </select>
          {isLoading && "Loading..."}
          {posts?.map((post) => (
            <div className={styles.posts}>
              <div className={styles.postProfile}>
                <div className={styles.addDelete}>
                  <div>
                    <Image
                      src={post.user.image}
                      width={50}
                      height={50}
                      className={styles.postProfileImg}
                    />
                    {post.user.name}
                  </div>
                  <FaDeleteLeft onClick={() => handleDelete(post.id)} />
                </div>
                <div className={styles.trade}>My Trade: {post.myTrade}</div>
              </div>
              <div className={styles.tradeImgContainer}>
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className={styles.tradeImg}
                />
              </div>
              <div className={styles.needs}>
                <span>MY NEEDS </span>
                <div>{post.myNeed}</div>
              </div>
              {user.id !== post.user.id && (
                <button
                  onClick={() => handleSelect(post.user)}
                  className={styles.button}
                >
                  Message
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
