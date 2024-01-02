"use client";
import { useEffect, useState } from "react";
import styles from "./registration.module.css";
import { useRouter } from "next/navigation";
import Spinner from "../spinner/Spinner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { app } from "../../utils/firebase";

const storage = getStorage(app);

export default function Post() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [media, setMedia] = useState("");
  const [myTrade, setMyTrade] = useState("");
  const [myNeed, setMyNeed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const handleChange = (e) => {
    setMedia(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const router = useRouter();

  useEffect(() => {
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImage(downloadURL);
          });
        }
      );
    };

    if (media) {
      setImageUploading(true);
      upload();
    }
  }, [media]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        image,
        myNeed,
        myTrade,
      }),
    });

    await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(),
    });

    if (res.status == 201) {
      router.push("/");
      localStorage.setItem("currentIndex", 0);
    } else {
      setIsLoading(false);
      console.log("Something went wrong");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.postContainer}>
      <div className={styles.header}>Create your first trade post</div>
      <div className={styles.listContainer}>
        <ul className={styles.questionList}>
          <li>Are you in need of anything?</li>
          <li>What are you in need of?</li>
          <li>
            Which trade, goods, skills or services, do you have that can be
            Exchange for
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
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.previewImage}>
          Preview Image
          <img src={file} alt="" />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="yourTrade">What's your Trade?</label>
          <input
            type="text"
            id="yourTrade"
            placeholder="What's your trade, goods, skills, services"
            required
            onChange={(e) => setMyTrade(e.target.value)}
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="yourNeed">What's your Need?</label>
          <input
            type="text"
            id="yourNeed"
            placeholder="What's your needs?"
            required
            onChange={(e) => setMyNeed(e.target.value)}
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="tradeImage">Trade Image</label>
          <input type="file" id="tradeImage" required onChange={handleChange} />
        </div>
        <button disabled={imageUploading} className={styles.button}>
          {imageUploading ? "uploading image in progress" : "Submit"}
        </button>
      </form>
    </div>
  );
}
