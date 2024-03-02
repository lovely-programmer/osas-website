"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { IoIosArrowRoundBack, IoIosSearch } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { getAUser } from "../../requests/requests";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { app, db } from "../../utils/firebase";
import { v4 as uuid } from "uuid";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
const storage = getStorage(app);

export default function Message() {
  const [showChat, setShowChat] = useState(false);
  const [chats, setChats] = useState([]);
  const { user } = getAUser();
  const [navUser, setNavUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageUserId, setMessageUserId] = useState(null);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.email), (doc) => {
        setChats(doc.data());
      });
      return () => unsub();
    };
    user.email && getChats();
  }, [user.email]);

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

  const handleSelect = (u) => {
    setNavUser(u);
    setMessageUserId(u?.id);
  };

  const handleSubmit = async (receiver) => {
    // update array in firebase arrayUnion
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
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
    } else {
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

    await updateDoc(doc(db, "userChats", receiver?.email), {
      [combinedId + ".lastMessage"]: {
        text,
      },
      [combinedId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <h4>Chats</h4>
          <div className={styles.searchContainer}>
            <IoIosSearch />
            <input type="text" placeholder="Search" />
          </div>
          <div className={styles.chats}>
            <span className={styles.all}>All Chats</span>
            {chats &&
              Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => (
                  <div className={styles.profile} key={chat[0]}>
                    <div onClick={() => handleSelect(chat[1].userInfo)}>
                      <Image
                        src={chat[1].userInfo.image}
                        width={50}
                        height={50}
                        className={styles.profileImg}
                      />
                      <div className={styles.personContainer_1}>
                        <span>{chat[1].userInfo.name}</span>
                        <div className={styles.person}>
                          <p>
                            {chat[1].lastMessage?.text
                              ? chat[1].lastMessage?.text
                              : "Click to start a conversation"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.container}>
            {navUser && (
              <div className={styles.header}>
                <div className={styles.profile}>
                  <div>
                    <Image
                      src={navUser?.image}
                      width={50}
                      height={50}
                      className={styles.profileImg}
                    />
                    <div className={styles.personContainer}>
                      <span>{navUser?.name}</span>
                      <div className={styles.person}>online</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.chats}>
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
                    <p>{m.text}</p>
                    {m.img && <Image src={m.img} alt="" fill />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {navUser && (
            <div className={styles.messageBox}>
              <form>
                <textarea
                  onChange={(e) => setText(e.target.value)}
                  type="text"
                  autoFocus
                  value={text}
                />
                <button type="button" onClick={() => handleSubmit(navUser)}>
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Devices */}
      <div className={styles.mobileContainer}>
        <div className={`${styles.left} ${showChat && "hide"}`}>
          <h4>Chats</h4>
          <div className={styles.searchContainer}>
            <IoIosSearch />
            <input type="text" placeholder="Search" />
          </div>
          <div className={styles.chats}>
            <span className={styles.all}>All Chats</span>
            {chats &&
              Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => (
                  <div className={styles.profile} key={chat[0]}>
                    <div onClick={() => handleSelect(chat[1].userInfo)}>
                      <Image
                        src={chat[1].userInfo.image}
                        width={50}
                        height={50}
                        className={styles.profileImg}
                      />
                      <div
                        onClick={() => setShowChat(true)}
                        className={styles.personContainer_1}
                      >
                        <span>{chat[1].userInfo.name}</span>
                        <div className={styles.person}>
                          <p>
                            {chat[1].lastMessage?.text
                              ? chat[1].lastMessage?.text
                              : "Click to start a conversation"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {showChat && (
          <div className={styles.right}>
            <div className={styles.container}>
              {navUser && (
                <div className={styles.header}>
                  <div className={styles.profile}>
                    <div>
                      <Image
                        src={navUser?.image}
                        width={50}
                        height={50}
                        className={styles.profileImg}
                      />
                      <div className={styles.personContainer}>
                        <span>{navUser?.name}</span>
                        <div className={styles.person}>online</div>
                      </div>
                    </div>
                  </div>

                  <IoIosArrowRoundBack onClick={() => setShowChat(false)} />
                </div>
              )}
            </div>

            <div className={styles.chats}>
              <div className={styles.chatTop}>
                {messages.map((m) => (
                  <div
                    ref={ref}
                    className={`${
                      m.senderId === user.id
                        ? styles.chatRight
                        : styles.chatLeft
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
                      <p>{m.text}</p>
                      {m.img && <Image src={m.img} alt="" fill />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.messageBox}>
              <form>
                <textarea
                  onChange={(e) => setText(e.target.value)}
                  type="text"
                  autoFocus
                  value={text}
                />
                <button type="button" onClick={() => handleSubmit(navUser)}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
