"use client";
import { usePathname } from "next/navigation";
import Navbar from "../components/navbar/Navbar";

export default function ShowNavbar() {
  const pathname = usePathname();
  if (pathname !== "/message" && pathname !== "/welcome") {
    return <Navbar />;
  }
}
