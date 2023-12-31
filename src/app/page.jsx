"use client";
import Carousel from "../components/carousel/Carousel";
import Posts from "../components/posts/Posts";
import Spinner from "../components/spinner/Spinner";
import { getPosts } from "../requests/requests";

export default function Home() {
  const { data, isLoading } = getPosts();

  if (isLoading) return <Spinner />;
  return (
    <>
      <Carousel carousel="/jane.jpg" />
      {data && data?.map((post) => <Posts post={post} key={post._id} />)}
    </>
  );
}
