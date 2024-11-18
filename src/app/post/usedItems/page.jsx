"use client";
import styles from "../post.module.css";
import { useEffect, useState } from "react";
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

export default function UsedItems() {
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [usedItem, setUsedItem] = useState("");
  const [aboutItem, setAboutItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const handleChange = (e) => {
    setMedia(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const slug = "usedItem";

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
                usedItem,
                aboutItem,
              }),
            });

            await fetch(`/api/notification/${slug}`, {
              method: "PUT",
            });

            if (res.status == 201) {
              setUsedItem("");
              setAboutItem("");
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
        <div className={styles.header}>My Free Used Item Post</div>
        <div className={styles.listContainer}>
          <ul className={styles.questionList}>
            <li>
              Do you know millions of people are in need of what you call trash
            </li>
            <li>
              Do you know that thousands of people are in need of that item or
              goods you no longer use again?
            </li>
            <li>
              Do you know placing it here for give away without knowing the
              receiver promote more blessing and greater appreciation?
            </li>
          </ul>
        </div>
        <div className={styles.note}>
          <span>Note:</span>
          <ul>
            <li>
              Students Support is a Godly foundation, which enables you to be a
              blessing to someone through your given away of your used item
            </li>
            <li>Student Support enables you to a be blessing through giving</li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.previewImage}>
            Preview Image <img src={file} alt="" />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="usedItem">What's your used item?</label>
            <textarea
              cols="20"
              rows="5"
              id="usedItem"
              placeholder="What's your used item"
              required
              onChange={(e) => setUsedItem(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="aboutItem">
              Write something about your used item
            </label>
            <textarea
              cols="20"
              rows="5"
              id="aboutItem"
              placeholder="Write something about your used item"
              required
              onChange={(e) => setAboutItem(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="useditemimage">Used item Image</label>
            <input
              type="file"
              id="useditemimage"
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
