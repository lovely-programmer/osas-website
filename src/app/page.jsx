"use client";
import { useSession } from "next-auth/react";
import Carousel from "../components/carousel/Carousel";
import Posts from "../components/posts/Posts";
import Spinner from "../components/spinner/Spinner";
import { getAUser, getPosts } from "../requests/requests";

export default function Home() {
  const { data, isLoading } = getPosts();
  const { status } = useSession();
  const { user } = getAUser();

  if (isLoading) return <Spinner />;
  return (
    <>
      <Carousel carousel="/jane.jpg" />
      {status === "authenticated" &&
        user.createdSuccessfully &&
        data &&
        data?.map((post) => <Posts post={post} key={post._id} />)}
    </>
  );
}
