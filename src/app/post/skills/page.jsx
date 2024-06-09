"use client";
import styles from "../post.module.css";
import { useState } from "react";
import { app } from "../../../utils/firebase";
import Spinner from "../../../components/spinner/Spinner";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage(app);

export default function Skills() {
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [skill, setSkill] = useState("");
  const [aboutSkill, setAboutSkill] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const handleChange = (e) => {
    setMedia(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const slug = "skills";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const upload = () => {
      const name = new Date().getTime() + media.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, media);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          if (progress == "100") setImageUploading(false);
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
            const res = await fetch(`/api/posts/${slug}`, {
              method: "POST",
              body: JSON.stringify({
                image: downloadURL,
                skill,
                location,
                aboutSkill,
              }),
            });

            await fetch(`/api/notification/${slug}`, {
              method: "PUT",
            });

            if (res.status == 201) {
              setSkill("");
              setLocation("");
              setAboutSkill("");
              setMedia("");
              setFile(null);
              setIsLoading(false);
              toast.success("You have successfully posted");
            } else {
              setIsLoading(false);
              toast.error("Something went wrong");
            }
          });
        }
      );
    };

    upload();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="wrapper">
      <div className={styles.container}>
        <div className={styles.header}>My Skill or Services Post</div>
        <div className={styles.listContainer}>
          <ul className={styles.questionList}>
            <li>
              Do you have any skill or services, you want the world to know?
            </li>
            <li>
              Do you know it cost you less or nothing to share the world about
              it here?
            </li>
            <li>Do you know that there is no limit to your post here.</li>
          </ul>
        </div>
        <div className={styles.note}>
          <span>Note:</span>
          <ul>
            <li>
              Students Support is a Godly foundation, raised to help tell the
              World about your skill or service without limit to your post views
            </li>
            <li>
              Student Support helps you connect to people who needs your
              services or skills
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.previewImage}>
            Preview Image <img src={file} alt="" />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="skills">What's your skill or service?</label>
            <textarea
              cols="20"
              rows="5"
              id="skills"
              placeholder="What's your skill or service"
              required
              onChange={(e) => setSkill(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="location">What's your location?</label>
            <textarea
              cols="20"
              rows="5"
              id="location"
              placeholder="What's your location"
              required
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="aboutService">
              Write something about your skill or service
            </label>
            <textarea
              cols="20"
              rows="5"
              id="aboutService"
              placeholder="Write something about your skill or service"
              required
              onChange={(e) => setAboutSkill(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="skillImage">Skill or Service Image</label>
            <input
              type="file"
              id="skillImage"
              accept="image/png, image/gif, image/jpeg"
              required
              onChange={handleChange}
            />
          </div>
          <button disabled={imageUploading} className={styles.button}>
            {imageUploading ? "uploading image in progress" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
