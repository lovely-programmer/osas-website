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

export default function TradePost() {
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [myTrade, setMyTrade] = useState("");
  const [myNeed, setMyNeed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const handleChange = (e) => {
    setMedia(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const slug = "need";

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
            const res = await fetch("/api/posts", {
              method: "POST",
              body: JSON.stringify({
                image: downloadURL,
                myNeed,
                myTrade,
              }),
            });

            await fetch(`/api/notification/${slug}`, {
              method: "PUT",
            });

            if (res.status == "201") {
              setMyNeed("");
              setMyTrade("");
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
        <div className={styles.header}>My Trade Post</div>
        <div className={styles.listContainer}>
          <ul className={styles.questionList}>
            <li>Are you in need of anything?</li>
            <li>What are you in need of?</li>
            <li>
              Which trade, goods, skills or services, do you have that can be
              Exchange for{" "}
            </li>
          </ul>
        </div>
        <div className={styles.note}>
          <span>Note:</span>
          <ul>
            <li>
              Students Support is a Godly foundation, raised to help Students at
              all times
            </li>
            <li>
              Student Support helps you connect to people of similar needs by
              Exchanging goods, skills or services
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.previewImage}>
            Preview Image <img src={file} alt="" />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="yourTrade">What's your Trade?</label>
            <textarea
              cols="20"
              rows="5"
              id="yourTrade"
              placeholder="What's your trade, goods, skills, services"
              required
              onChange={(e) => setMyTrade(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="yourNeed">What's your Need?</label>
            <textarea
              cols="20"
              rows="5"
              id="yourNeed"
              placeholder="What's your needs?"
              required
              onChange={(e) => setMyNeed(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="tradeImage">Trade Image</label>
            <input
              type="file"
              id="tradeImage"
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
