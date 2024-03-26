"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { IoIosArrowRoundBack, IoIosSearch } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { getAUser } from "../../requests/requests";
import { MdDelete } from "react-icons/md";
import { IoMdAttach } from "react-icons/io";
import {
  Timestamp,
  arrayRemove,
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
  ref as uploadRef,
  uploadBytesResumable,
} from "firebase/storage";
import MessageLoader from "../../components/messageLoader/MessageLoader";
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
  const [imageUploading, setImageUploading] = useState(false);
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

  useEffect(() => {
    const update = async () => {
      await updateDoc(doc(db, "userChats", navUser?.email), {
        [combinedId + ".unseenMessage"]: {
          data: {
            number: 0,
          },
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    };
    navUser && update();
  }, [navUser]);

  const getOnlyone = Object.entries(chats)?.filter(
    (c) => c[1].userInfo.email === navUser?.email
  );

  const unseenMessageCount = getOnlyone.map(
    (one) => one[1].unseenMessage?.data?.number
  );

  console.log(unseenMessageCount[0]);

  const handleSubmit = async (receiver) => {
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

      await updateDoc(doc(db, "userChats", receiver?.email), {
        [combinedId + ".lastMessage"]: {
          text,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

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
      }

      setText("");
    } else {
      upload();
      setImg(null);
      setText("");
    }

    setImg(null);
    setText("");
  };

  const lastMessage = messages[messages.length - 1];

  const updateLastMessage = async () => {
    if (lastMessage?.text) {
      await updateDoc(doc(db, "userChats", user?.email), {
        [combinedId + ".lastMessage"]: {
          text: lastMessage?.text,
        },
      });

      await updateDoc(doc(db, "userChats", navUser?.email), {
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
  };

  useEffect(() => {
    setTimeout(5000, updateLastMessage());
  }, [handleDelete]);

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
                          {chat[1].unseenMessage?.data?.number &&
                            chat[1].unseenMessage?.data?.number > 0 &&
                            chat[1].unseenMessage?.data?.id !== user?.email && (
                              <div className={styles.notification}>
                                {chat[1].unseenMessage?.data.number}
                              </div>
                            )}
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
            <div className={styles.chatTop}>
              <div>
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

          {navUser && (
            <div className={styles.messageBox}>
              <div className={styles.form}>
                <textarea
                  onChange={(e) => setText(e.target.value)}
                  type="text"
                  autoFocus
                  value={text}
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
                <button type="button" onClick={() => handleSubmit(navUser)}>
                  Submit
                </button>
              </div>
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
                          {chat[1].unseenMessage?.data?.number &&
                            chat[1].unseenMessage?.data?.number > 0 &&
                            chat[1].unseenMessage?.data?.id !== user?.email && (
                              <div className={styles.notification}>
                                {chat[1].unseenMessage?.data.number}
                              </div>
                            )}
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
                <div>
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
                              style={{
                                marginBottom: "5px",
                                borderRadius: "5px",
                              }}
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
                  onChange={(e) => setText(e.target.value)}
                  type="text"
                  autoFocus
                  value={text}
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
                <button type="button" onClick={() => handleSubmit(navUser)}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
