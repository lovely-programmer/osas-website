"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { getAUser } from "../../../requests/requests";
import { MessagerContext } from "../../../context/MessangeUserContext";
import MessageLoader from "../../../components/messageLoader/MessageLoader";
import {
  Timestamp,
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { app, db } from "../../../utils/firebase";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref as uploadRef,
} from "firebase/storage";
import styles from "../page.module.css";
import { MdDelete } from "react-icons/md";
import { IoMdAttach } from "react-icons/io";
import { v4 as uuid } from "uuid";
import Image from "next/image";
import Navbar from "../../../components/message/Navbar/Navbar";
const storage = getStorage(app);

export default function page() {
  const { user } = getAUser();
  const { data } = useContext(MessagerContext);
  const messageUserId = data?.userInfo?.id;
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [submited, setSubmited] = useState(false);
  const ref = useRef();
  const inputRef = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user?.email), (doc) => {
        setChats(doc.data());
      });
      return () => unsub();
    };
    user?.email && getChats();
  }, [user?.email]);

  const combinedId =
    user?.id > messageUserId
      ? user?.id + messageUserId
      : messageUserId + user?.id;

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", combinedId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => unsub();
  }, [combinedId]);

  const getOnlyone = Object.entries(chats)?.filter(
    (c) => c[1].userInfo?.email === data?.userInfo?.email
  );

  const unseenMessageCount = getOnlyone.map(
    (one) => one[1].unseenMessage?.data?.number
  );

  const handleSubmit = async () => {
    setSubmited(true);
    inputRef?.current.focus();
    // update array in firebase arrayUnion

    const upload = () => {
      const storageRef = uploadRef(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          if (progress !== "100") setImageUploading(true);
          if (progress == 100) setImageUploading(false);
          if (progress)
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
            await updateDoc(doc(db, "chats", combinedId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                img: downloadURL,
                senderId: user?.id,
                date: Timestamp.now(),
              }),
            });
          });
        }
      );
    };

    if (typeof unseenMessageCount[0] == "number") {
      await updateDoc(doc(db, "userChats", user?.email), {
        [combinedId + ".unseenMessage"]: {
          data: {
            id: user?.email,
            number: unseenMessageCount[0] + 1,
          },
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data?.userInfo?.email), {
        [combinedId + ".unseenMessage"]: {
          data: {
            id: user?.email,
            number: unseenMessageCount[0] + 1,
          },
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    } else {
      await updateDoc(doc(db, "userChats", user?.email), {
        [combinedId + ".unseenMessage"]: {
          data: {
            id: user?.email,
            number: 1,
          },
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data?.userInfo?.email), {
        [combinedId + ".unseenMessage"]: {
          data: {
            id: user?.email,
            number: 1,
          },
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }

    if (img == null) {
      if (text !== "") {
        await updateDoc(doc(db, "chats", combinedId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: user?.id,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db, "userChats", user?.email), {
        [combinedId + ".lastMessage"]: {
          text,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data?.userInfo?.email), {
        [combinedId + ".lastMessage"]: {
          text,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    } else {
      upload();
    }

    setImg(null);
    setText("");
    setSubmited(false);
  };

  const lastMessage = messages[messages?.length - 1];

  const updateLastMessage = async () => {
    if (lastMessage?.text) {
      await updateDoc(doc(db, "userChats", user?.email), {
        [combinedId + ".lastMessage"]: {
          text: lastMessage?.text,
        },
      });

      await updateDoc(doc(db, "userChats", data?.userInfo?.email), {
        [combinedId + ".lastMessage"]: {
          text: lastMessage?.text,
        },
      });
    }
  };

  const handleDelete = async (m) => {
    if (confirm("you are about to delete this post")) {
      if (m.img) {
        await updateDoc(doc(db, "chats", combinedId), {
          messages: arrayRemove({
            id: m.id,
            text: m.text,
            img: m.img,
            senderId: m.senderId,
            date: m.date,
          }),
        });
      }
      await updateDoc(doc(db, "chats", combinedId), {
        messages: arrayRemove({
          id: m.id,
          text: m.text,
          senderId: m.senderId,
          date: m.date,
        }),
      });
    }

    setTimeout(() => {
      updateLastMessage();
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <Navbar />
        <div
          className={`${styles.chats} ${
            document.activeElement === inputRef?.current && "smallChat"
          }`}
        >
          <div className={styles.chatTop}>
            <div>
              {messages.map((m) => (
                <div
                  ref={ref}
                  className={`${
                    m.senderId === user.id ? styles.chatRight : styles.chatLeft
                  }`}
                  key={m.id}
                >
                  <div
                    className={`${
                      m.senderId === user.id
                        ? styles.rightText
                        : styles.leftText
                    }`}
                  >
                    <p>
                      <div className={styles.p_text}>{m.text} </div>
                      <div className={styles.p_icon}>
                        {m.senderId === user.id && (
                          <MdDelete onClick={() => handleDelete(m)} />
                        )}
                      </div>
                    </p>
                    {m.img && (
                      <div
                        style={{
                          display: "flex",
                          marginRight: "10px",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Image
                          src={m.img}
                          alt=""
                          height={200}
                          width={200}
                          style={{ marginBottom: "5px", borderRadius: "5px" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "32px",
              }}
            >
              {imageUploading && <MessageLoader />}
            </div>
          </div>
        </div>

        <div className={styles.messageBox}>
          <div className={styles.form}>
            <textarea
              ref={inputRef}
              onChange={(e) => setText(e.target.value)}
              value={submited ? "" : text}
              type="text"
              autoFocus
              cols="20"
              rows="10"
            />
            <label htmlFor="photoImg">
              <IoMdAttach style={{ cursor: "pointer" }} />
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              id="photoImg"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => setImg(e.target.files[0])}
            />
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
