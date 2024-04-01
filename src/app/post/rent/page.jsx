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

export default function page() {
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [rentItem, setRentItem] = useState("");
  const [aboutItem, setAboutItem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const handleChange = (e) => {
    setMedia(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const slug = "rentItem";

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
                rentItem,
                aboutItem,
              }),
            });

            await fetch(`/api/notification/${slug}`, {
              method: "PUT",
            });

            if (res.status == 201) {
              setRentItem("");
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
        <div className={styles.header}>My Rent/ Lease Post</div>
        <div className={styles.listContainer}>
          <ul className={styles.questionList}>
            <li>Do you have any item or goods to lease/rent out?</li>
            <li>Do you know millions of person needs it</li>
            <li>
              Do you know you can make huge amount of money in leasing or
              renting out
            </li>
          </ul>
        </div>
        <div className={styles.note}>
          <span>Note:</span>
          <ul>
            <li>
              Students Support is a Godly foundation, raised to help you make
              money through leasing or Renting out your item or goods
            </li>
            <li>
              Student Support helps you connect to people who need that item or
              goods
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.previewImage}>
            Preview Image <img src={file} alt="" />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="rent">What's do you want to rent</label>
            <textarea
              id="rent"
              cols="20"
              rows="5"
              placeholder="What's do you want to rent"
              required
              onChange={(e) => setRentItem(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="aboutRent">Write something about the item</label>
            <textarea
              id="aboutRent"
              cols="20"
              rows="5"
              placeholder="Write something about the item"
              required
              onChange={(e) => setAboutItem(e.target.value)}
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="rentItemImage">Rent/Lease Image</label>
            <input
              type="file"
              id="rentItemImage"
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
