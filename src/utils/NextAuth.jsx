"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getUser } from "../requests/requests";

export default function NextAuth({ children }) {
  const { data, status } = useSession();
  const email = data?.user?.email;
  const router = useRouter();

  const { user } = getUser(email);

  if (status === "unauthenticated" && user !== true) {
    router.push("/signin");
  }

  return <div>{children}</div>;
}
