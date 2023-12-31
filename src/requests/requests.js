"use client";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const url = "https://studenthelpers.netlify.app";

// "https://studenthelpers.netlify.app"
// http://localhost:3000

export const getData = (email) => {
  const { data, error, isLoading } = useSWR(`${url}api/user/${email}`, fetcher);

  return {
    user: data?.user?.createdSuccessfully,
    isLoading,
  };
};

export const getPosts = () => {
  const { data, error, isLoading } = useSWR(`${url}/api/posts`, fetcher);
  return {
    data,
    error,
    isLoading,
  };
};

export const getAllOtherPosts = (slug) => {
  const { data, error, isLoading } = useSWR(
    `${url}/api/posts/${slug}`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
  };
};
