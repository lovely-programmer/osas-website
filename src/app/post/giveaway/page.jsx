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

export default function Giveaway() {
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [giveawayItem, setGiveawayItem] = useState("");
  const [aboutItem, setAboutItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const handleChange = (e) => {
    setMedia(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const slug = "giveaway";

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
                giveawayItem,
                aboutItem,
              }),
            });

            await fetch(`/api/notification/${slug}`, {
              method: "PUT",
            });

            if (res.status == 201) {
              setGiveawayItem("");
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
        <div className={styles.header}>Giveaway</div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.previewImage}>
            Preview Image <img src={file} alt="" />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="giveaway">What's do you want to giveaway</label>
            <textarea
              cols="20"
              rows="5"
              id="giveaway"
              placeholder="What's do you want to giveaway"
              required
              onChange={(e) => setGiveawayItem(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="aboutGiveawayItem">
              Write something about the item
            </label>
            <textarea
              type="text"
              id="aboutGiveawayItem"
              placeholder="Write something about the item"
              required
              onChange={(e) => setAboutItem(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="giveawayItemImage">Giveaway Item Image</label>
            <input
              type="file"
              id="giveawayItemImage"
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
