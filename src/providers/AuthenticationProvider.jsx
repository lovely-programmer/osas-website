"use client";
import { SessionProvider } from "next-auth/react";

export default function AuthenticationProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
