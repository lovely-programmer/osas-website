"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { getAUser } from "../../../requests/requests";
import { MessagerContext } from "../../../context/MessangeUserContext";
import { IoIosSearch } from "react-icons/io";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import styles from "../page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const { user } = getAUser();
  const [chats, setChats] = useState([]);
  const [query, setQuery] = useState("");
  const { data, dispatch } = useContext(MessagerContext);
  const router = useRouter();
  const messageUserId = data?.userInfo?.id;

  const conversation =
    chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date);

  const filteredConversation = useMemo(
    () =>
      conversation?.filter((c) => {
        return c[1].userInfo?.name.toLowerCase().includes(query.toLowerCase());
      }),
    [conversation, query]
  );

  const combinedId =
    user?.id > messageUserId
      ? user?.id + messageUserId
      : messageUserId + user?.id;

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.email), (doc) => {
        setChats(doc.data());
      });
      return () => unsub();
    };
    user.email && getChats();
  }, [user.email]);

  const handleSelect = (u) => {
    dispatch({
      type: "SELECT_USER",
      payload: u,
    });
    localStorage.setItem("selectUserData", JSON.stringify(u));

    const update = async () => {
      await updateDoc(doc(db, "userChats", data?.userInfo?.email), {
        [combinedId + ".unseenMessage"]: {
          data: {
            id: data?.userInfo?.email,
            number: 0,
          },
        },
      });
      await updateDoc(doc(db, "userChats", user?.email), {
        [combinedId + ".unseenMessage"]: {
          data: {
            id: data?.userInfo?.email,
            number: 0,
          },
        },
      });
    };

    data && update();
    router.push(`/message/${u.id}`);
  };

  return (
    // !messagePage && (
    <div className={styles.left}>
      <div className={styles.topLeft}>
        <h4>Chats</h4>
        <Link href="/">Home</Link>
      </div>
      <div className={styles.searchContainer}>
        <IoIosSearch />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search"
        />
      </div>
      <div className={styles.chats}>
        <span className={styles.all}>All Chats</span>
        {filteredConversation?.map((chat) => (
          <div className={styles.profile} key={chat[0]}>
            <div onClick={() => handleSelect(chat[1].userInfo)}>
              <Image
                src={chat[1].userInfo.image}
                width={50}
                height={50}
                className={styles.profileImg}
              />
              <div className={styles.personContainer_1}>
                <div className={styles.info}>
                  <span>{chat[1].userInfo.name}</span>
                  {chat[1]?.unseenMessage?.data.number > 0 &&
                    chat[1]?.unseenMessage?.data?.id !== user?.email && (
                      <div className={styles.notification}>
                        {chat[1]?.unseenMessage?.data?.number}
                      </div>
                    )}
                </div>
                <div className={styles.person}>
                  <p>
                    {chat[1]?.lastMessage?.text
                      ? chat[1]?.lastMessage?.text
                      : "Click to start a conversation"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    // )
  );
}
