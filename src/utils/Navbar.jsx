"use client";
import { usePathname } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import WelcomeNav from "../components/navbar/welcomeNav";
import { useEffect, useState } from "react";

export default function ShowNavbar() {
  const pathname = usePathname();
  const [messagePage, setMessagePage] = useState(false);

  useEffect(() => {
    if (pathname === "/message") setMessagePage(true);
  }, [pathname]);

  if (pathname === "/welcome") {
    return <WelcomeNav />;
  }

  if (!messagePage) {
    return <Navbar />;
  }
}
