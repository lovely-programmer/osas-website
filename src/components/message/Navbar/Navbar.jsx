import React, { useContext } from "react";
import { MessagerContext } from "../../../context/MessangeUserContext";
import styles from "../page.module.css";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function Navbar() {
  const { data } = useContext(MessagerContext);

  return (
    <div className={styles.navContainer}>
      {data && (
        <div className={styles.header}>
          <div className={styles.profile}>
            <div>
              <Image
                src={data?.userInfo?.image}
                width={50}
                height={50}
                className={styles.profileImg}
              />
              <div className={styles.personContainer}>
                <span>{data?.userInfo?.name}</span>
                {/* <div className={styles.person}>online</div> */}
              </div>
            </div>
          </div>
          <div className={styles.arrowBack}>
            <Link href="/message">
              <IoIosArrowRoundBack />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
