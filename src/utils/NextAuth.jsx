"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getAUser } from "../requests/requests";
import Spinner from "../components/spinner/Spinner";

export default function NextAuth({ children }) {
  const { status } = useSession();
  const { user, isLoading } = getAUser();
  const router = useRouter();

  if (isLoading) {
    return <Spinner />;
  }

  if (status === "unauthenticated" && user?.createdSuccessfully == false) {
    router.push("/signin");
  }

  return <div>{children}</div>;
}
