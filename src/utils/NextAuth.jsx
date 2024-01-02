"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spinner from "../components/spinner/Spinner";

export default function NextAuth({ children }) {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/signin");
  }

  return <div>{children}</div>;
}
