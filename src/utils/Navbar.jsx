"use client";
import { usePathname } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import WelcomeNav from "../components/navbar/welcomeNav";
import { useEffect, useState } from "react";

export default function ShowNavbar() {
  const pathname = usePathname();
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    if (pathname === "/message" || pathname === "/welcome") setShowNav(false);
  }, [pathname]);

  if (pathname === "/welcome") {
    return <WelcomeNav />;
  }

  if (showNav) {
    return <Navbar />;
  }
}
