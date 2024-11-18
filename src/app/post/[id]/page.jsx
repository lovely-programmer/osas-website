"use client";
import { useContext, useEffect } from "react";
import styles from "./page.module.css";
import { ImageContext } from "../../../context/ImageContext";
import { useRouter } from "next/navigation";

export default function page() {
  const { data } = useContext(ImageContext);
  const router = useRouter();

  data.imageUrl == "" && router.push(`${data.pathname}`);

  return (
    <div className={styles.container}>
      <img src={data.imageUrl} alt="" />
    </div>
  );
}
