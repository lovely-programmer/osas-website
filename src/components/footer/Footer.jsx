"use client";
import Link from "next/link";
import styles from "./footer.module.css";
import { IoChatbubblesOutline, IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineWorkOutline } from "react-icons/md";
import { LiaHandHoldingHeartSolid } from "react-icons/lia";
import { RiShoppingBasketLine } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { getAUser } from "../../requests/requests";
import { usePathname, useSearchParams } from "next/navigation";

export default function Footer() {
  const { status } = useSession();
  const { user } = getAUser();
  const skillNotification = user?.skillNotification;
  const rentNotification = user?.rentNotification;
  const marketNotification = user?.marketNotification;
  const giveNotification = user?.giveNotification;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = pathname + searchParams;
  const messagePage = url.split("/")[1] === "message";

  const setSkillNotificationDefault = async (slug) => {
    if (skillNotification > 0) {
      await fetch(`/api/notification/update/${slug}`, {
        method: "PUT",
      });
    }
  };

  const setRentNotificationDefault = async (slug) => {
    if (rentNotification > 0) {
      await fetch(`/api/notification/update/${slug}`, {
        method: "PUT",
      });
    }
  };

  const setMarketNotification = async (slug) => {
    if (marketNotification > 0) {
      await fetch(`/api/notification/update/${slug}`, {
        method: "PUT",
      });
    }
  };

  const setGiveNotification = async (slug) => {
    if (giveNotification > 0) {
      await fetch(`/api/notification/update/${slug}`, {
        method: "PUT",
      });
    }
  };

  return (
    <>
      {status === "authenticated" &&
        user?.createdSuccessfully == true &&
        !messagePage && <div className={styles.top}></div>}
      {status === "authenticated" &&
        user?.createdSuccessfully == true &&
        !messagePage && (
          <div className={styles.footer}>
            <div className="wrapper">
              <div className={styles.footerContainer}>
                <div>
                  <Link href="/contact">
                    <IoChatbubblesOutline />
                  </Link>
                  <Link href="/contact">Customer Care</Link>
                </div>
                <div
                  className={styles.ballDiv}
                  onClick={() => setSkillNotificationDefault("skills")}
                >
                  <Link href="/posts/skills">
                    <MdOutlineWorkOutline />
                  </Link>
                  <Link href="/posts/skills">Skill or Service</Link>
                  {skillNotification > 0 && (
                    <div
                      style={{ marginLeft: "22px", top: "-4px" }}
                      className={styles.ball}
                    >
                      {skillNotification}
                    </div>
                  )}
                </div>
                <div
                  className={styles.ballDiv}
                  onClick={() => setRentNotificationDefault("rentItem")}
                >
                  <Link href="/posts/rents">
                    <img src="/lease.svg" alt="" />
                  </Link>
                  <Link className={styles.rent} href="/posts/rents">
                    Rent
                  </Link>
                  {rentNotification > 0 && (
                    <div className={styles.ball}>{rentNotification}</div>
                  )}
                </div>
                <div
                  className={styles.ballDiv}
                  onClick={() => setGiveNotification("giveaway")}
                >
                  <Link href="/posts/giveaway">
                    <LiaHandHoldingHeartSolid />
                  </Link>
                  <Link href="/posts/giveaway" className={styles.materials}>
                    Giveaway
                  </Link>
                  {giveNotification > 0 && (
                    <div className={styles.ball}>{giveNotification}</div>
                  )}
                </div>
                <div
                  className={styles.ballDiv}
                  onClick={() => setMarketNotification("market")}
                >
                  <Link href="/posts/studentmarket">
                    <RiShoppingBasketLine />
                  </Link>
                  <Link href="/posts/studentmarket">Students Market</Link>
                  {marketNotification > 0 && (
                    <div className={styles.ball}>{marketNotification}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
