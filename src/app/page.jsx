"use client";
import { useSession } from "next-auth/react";
import Carousel from "../components/carousel/Carousel";
import Posts from "../components/posts/Posts";
import Spinner from "../components/spinner/Spinner";
import { getPosts } from "../requests/requests";

export default function Home() {
  const { data, isLoading } = getPosts();
  const { status } = useSession();

  if (isLoading) return <Spinner />;
  return (
    <>
      <Carousel carousel="/jane.jpg" />
      {status === "authenticated" &&
        data.map((post) => <Posts post={post} key={post._id} />)}
    </>
  );
}
