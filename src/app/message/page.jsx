"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { IoIosArrowRoundBack, IoIosSearch } from "react-icons/io";
import { useState } from "react";

export default function Message() {
  const [showChat, setShowChat] = useState(false);

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
            <div className={styles.profile}>
              <div>
                <Image
                  src="/profile.png"
                  width={50}
                  height={50}
                  className={styles.profileImg}
                />
                <div className={styles.personContainer}>
                  <span>John Doe</span>
                  <div className={styles.person}>Hello what's up and going</div>
                </div>
              </div>
            </div>
            <div className={styles.profile}>
              <div>
                <Image
                  src="/profile.png"
                  width={50}
                  height={50}
                  className={styles.profileImg}
                />
                <div className={styles.personContainer}>
                  <span>John Doe</span>
                  <div className={styles.person}>Hello what's up and going</div>
                </div>
              </div>
            </div>
            <div className={styles.profile}>
              <div>
                <Image
                  src="/profile.png"
                  width={50}
                  height={50}
                  className={styles.profileImg}
                />
                <div className={styles.personContainer}>
                  <span>John Doe</span>
                  <div className={styles.person}>Hello what's up and going</div>
                </div>
              </div>
            </div>
            <div className={styles.profile}>
              <div>
                <Image
                  src="/profile.png"
                  width={50}
                  height={50}
                  className={styles.profileImg}
                />
                <div className={styles.personContainer}>
                  <span>John Doe</span>
                  <div className={styles.person}>Hello what's up and going</div>
                </div>
              </div>
            </div>
            <div className={styles.profile}>
              <div>
                <Image
                  src="/profile.png"
                  width={50}
                  height={50}
                  className={styles.profileImg}
                />
                <div className={styles.personContainer}>
                  <span>John Doe</span>
                  <div className={styles.person}>Hello what's up and going</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.profile}>
                <div>
                  <Image
                    src="/profile.png"
                    width={50}
                    height={50}
                    className={styles.profileImg}
                  />
                  <div className={styles.personContainer}>
                    <span>John Doe</span>
                    <div className={styles.person}>online</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.chats}>
            <div className={styles.chatLeft}>
              <div className={styles.leftText}>Hello</div>
            </div>
            <div className={styles.chatRight}>
              <div className={styles.rightText}>How are you doing?</div>
            </div>
            <div className={styles.chatLeft}>
              <div className={styles.leftText}>I am fine and you?</div>
            </div>
            <div className={styles.chatRight}>
              <div className={styles.rightText}>Am good</div>
            </div>
          </div>

          <div className={styles.messageBox}>
            <textarea type="text" autoFocus />
          </div>
        </div>
      </div>

      <div className={styles.mobileContainer}>
        <div className={`${styles.left} ${showChat && "hide"}`}>
          <h4>Chats</h4>
          <div className={styles.searchContainer}>
            <IoIosSearch />
            <input type="text" placeholder="Search" />
          </div>
          <div className={styles.chats}>
            <span className={styles.all}>All Chats</span>
            <div className={styles.profile}>
              <div>
                <Image
                  src="/profile.png"
                  width={50}
                  height={50}
                  className={styles.profileImg}
                />
                <div
                  className={styles.personContainer}
                  onClick={() => setShowChat(true)}
                >
                  <span>John Doe</span>
                  <div className={styles.person}>Hello what's up and going</div>
                </div>
              </div>
            </div>
            <div className={styles.profile}>
              <div>
                <Image
                  src="/profile.png"
                  width={50}
                  height={50}
                  className={styles.profileImg}
                />
                <div
                  className={styles.personContainer}
                  onClick={() => setShowChat(true)}
                >
                  <span>John Doe</span>
                  <div className={styles.person}>Hello what's up and going</div>
                </div>
              </div>
            </div>
            <div className={styles.profile}>
              <div>
                <Image
                  src="/profile.png"
                  width={50}
                  height={50}
                  className={styles.profileImg}
                />
                <div
                  className={styles.personContainer}
                  onClick={() => setShowChat(true)}
                >
                  <span>John Doe</span>
                  <div className={styles.person}>Hello what's up and going</div>
                </div>
              </div>
            </div>
            <div className={styles.profile}>
              <div>
                <Image
                  src="/profile.png"
                  width={50}
                  height={50}
                  className={styles.profileImg}
                />
                <div
                  className={styles.personContainer}
                  onClick={() => setShowChat(true)}
                >
                  <span>John Doe</span>
                  <div className={styles.person}>Hello what's up and going</div>
                </div>
              </div>
            </div>
            <div className={styles.profile}>
              <div>
                <Image
                  src="/profile.png"
                  width={50}
                  height={50}
                  className={styles.profileImg}
                />
                <div
                  className={styles.personContainer}
                  onClick={() => setShowChat(true)}
                >
                  <span>John Doe</span>
                  <div className={styles.person}>Hello what's up and going</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showChat && (
          <div className={styles.right}>
            <div className={styles.container}>
              <div className={styles.header}>
                <div className={styles.profile}>
                  <div>
                    <Image
                      src="/profile.png"
                      width={50}
                      height={50}
                      className={styles.profileImg}
                    />
                    <div className={styles.personContainer}>
                      <span>John Doe</span>
                      <div className={styles.person}>online</div>
                    </div>
                  </div>
                </div>

                <IoIosArrowRoundBack onClick={() => setShowChat(false)} />
              </div>
            </div>

            <div className={styles.chats}>
              <div className={styles.chatLeft}>
                <div className={styles.leftText}>Hello</div>
              </div>
              <div className={styles.chatRight}>
                <div className={styles.rightText}>How are you doing?</div>
              </div>
              <div className={styles.chatLeft}>
                <div className={styles.leftText}>I am fine and you?</div>
              </div>
              <div className={styles.chatRight}>
                <div className={styles.rightText}>Am good</div>
              </div>
              <div className={styles.chatLeft}>
                <div className={styles.leftText}>Hello</div>
              </div>
              <div className={styles.chatRight}>
                <div className={styles.rightText}>How are you doing?</div>
              </div>
              <div className={styles.chatLeft}>
                <div className={styles.leftText}>I am fine and you?</div>
              </div>
              <div className={styles.chatRight}>
                <div className={styles.rightText}>Am good</div>
              </div>
              <div className={styles.chatLeft}>
                <div className={styles.leftText}>Hello</div>
              </div>
              <div className={styles.chatRight}>
                <div className={styles.rightText}>How are you doing?</div>
              </div>
              <div className={styles.chatLeft}>
                <div className={styles.leftText}>I am fine and you?</div>
              </div>
              <div className={styles.chatRight}>
                <div className={styles.rightText}>Am good</div>
              </div>
            </div>

            <div className={styles.messageBox}>
              <textarea type="text" autoFocus />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
