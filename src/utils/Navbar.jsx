"use client";
import { usePathname } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import WelcomeNav from "../components/navbar/welcomeNav";
import { useEffect, useState } from "react";

export default function ShowNavbar() {
  const pathname = usePathname();
  const [showNav, setShowNav] = useState(true);

  console.log(showNav);

  useEffect(() => {
    if (
      pathname === "/message" ||
      pathname === "/welcome" ||
      pathname === "/siginin" ||
      pathname === "/signup/post" ||
      pathname === "/signup/welcome"
    ) {
      setShowNav(false);
    }

    if (
      pathname === "/posts/freeuseditems" ||
      pathname === "/posts/skills" ||
      pathname === "/posts/studentMarket" ||
      pathname === "/posts/rents" ||
      pathname === "/posts/profile" ||
      pathname === "/posts/skills" ||
      pathname === "/posts/skills"
    ) {
      setShowNav(true);
    }
  }, [pathname]);

  if (pathname === "/welcome") {
    return <WelcomeNav />;
  }

  if (showNav) {
    return <Navbar />;
  }
}
