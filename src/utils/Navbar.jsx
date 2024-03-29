"use client";
import { usePathname } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import WelcomeNav from "../components/navbar/welcomeNav";
import { useEffect, useState } from "react";

export default function ShowNavbar() {
  const pathname = usePathname();
  const [showNav, setShowNav] = useState(true);

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
      pathname === "/" ||
      pathname === "/posts/freeuseditems" ||
      pathname === "/posts/skills" ||
      pathname === "/posts/studentMarket" ||
      pathname === "/posts/rents" ||
      pathname === "/posts/giveaway" ||
      pathname === "/news" ||
      pathname === "/posts/profile" ||
      pathname === "/post/skill" ||
      pathname === "/post/useditems" ||
      pathname === "/post/studentmarket" ||
      pathname === "/post/rent" ||
      pathname === "/post/tradepost" ||
      pathname === "/post/giveaway" ||
      pathname === "/post/news" ||
      pathname === "/contact"
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
