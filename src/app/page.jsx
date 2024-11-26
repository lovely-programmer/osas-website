"use client";
import { useSession } from "next-auth/react";
import Carousel from "../components/carousel/Carousel";
import Posts from "../components/posts/Posts";
import Spinner from "../components/spinner/Spinner";
import { getAUser, getPosts } from "../requests/requests";
import { useContext, useMemo } from "react";
import { SearchContext } from "../context/SearchContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = getPosts();
  const { status } = useSession();
  const { user } = getAUser();
  const { data: search } = useContext(SearchContext);

  const searchItems = useMemo(
    () =>
      data &&
      data?.filter((p) => {
        return p.myTrade.toLowerCase().includes(search.text.toLowerCase());
      }),
    [data, search]
  );

  if (user?.country == null && user?.createdSuccessfully == false) {
    router.push("/signup/welcome");
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <Carousel carousel="/jane.jpg" />
      {status === "authenticated" &&
        user?.createdSuccessfully &&
        searchItems?.map((post) => <Posts post={post} key={post._id} />)}
    </>
  );
}
