"use client";
import { getSubscription } from "../requests/requests";
import { useEffect } from "react";

export default function NextAuth({ children }) {
  const { subscription } = getSubscription();

  useEffect(() => {
    const unSubscribe = () => {
      subscription &&
        subscription?.map(async (sub) => {
          if (
            new Date(subscription.subExpDate).getTime() >= new Date().getTime()
          ) {
            await fetch("/api/user/unsubscribe", {
              method: "PUT",
            });
          }
        });
    };

    unSubscribe();
  });

  return <div>{children}</div>;
}
