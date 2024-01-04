"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getAUser } from "../requests/requests";

export default function NextAuth({ children }) {
  const { status } = useSession();
  const { user } = getAUser();
  const router = useRouter();

  if (status === "unauthenticated" && user.createdSuccessfully !== true) {
    router.push("/signin");
  }

  return <div>{children}</div>;
}
