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

export default function StudentMarket() {
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [market, setMarket] = useState("");
  const [aboutMarket, setAboutMarket] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const handleChange = (e) => {
    setMedia(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const slug = "market";

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
                market,
                aboutMarket,
              }),
            });

            await fetch(`/api/notification/${slug}`, {
              method: "PUT",
            });

            if (res.status == 201) {
              setMarket("");
              setAboutMarket("");
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
        <div className={styles.header}>My Market Post</div>
        <div className={styles.listContainer}>
          <ul className={styles.questionList}>
            <li>Do you know have anything to sell?</li>
            <li>Do you know you make much sales selling here?</li>
            <li>
              It cost you less in showing millions of student your market here.
            </li>
          </ul>
        </div>
        <div className={styles.note}>
          <span>Note:</span>
          <ul>
            <li>
              Students Support is a Godly foundation, raised to help you make
              sale in your market
            </li>
            <li>
              Student Support create a platform for you to reach millions of
              student
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.previewImage}>
            Preview Image <img src={file} alt="" />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="market">What's your market?</label>
            <textarea
              cols="20"
              rows="5"
              id="market"
              placeholder="What's your market"
              required
              onChange={(e) => setMarket(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="aboutMarket">
              Write something about your market
            </label>
            <textarea
              cols="20"
              rows="5"
              id="aboutMarket"
              placeholder="Write something aboutyour market"
              required
              onChange={(e) => setAboutMarket(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="market">Market Image</label>
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              id="market"
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
