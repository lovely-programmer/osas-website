"use client";
import { usePathname } from "next/navigation";
import Footer from "../components/footer/Footer";

export default function ShowFooter() {
  const pathname = usePathname();

  if (pathname !== "/message") {
    return <Footer />;
  }
}
