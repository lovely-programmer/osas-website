"use client";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const url = "https://www.studentcentral.online";

// "https://studenthelpers.netlify.app"
// http://localhost:3000
// https://osas-website.vercel.app
// https://www.studentcentral.online
// https://student-support.onrender.com

export const getUser = (email) => {
  const { data, error, isLoading } = useSWR(
    `${url}/api/user/${email}`,
    fetcher
  );

  return {
    user: data,
    isLoading,
  };
};

export const getSubscription = () => {
  const { data, error, isLoading } = useSWR(
    `${url}/api/user/subscribe`,
    fetcher
  );

  return {
    subscription: data,
    isLoading,
  };
};

export const getAUser = () => {
  const { data, error, isLoading } = useSWR(`${url}/api/user`, fetcher);

  return {
    user: data,
    isLoading,
  };
};

export const textUser = async () => {
  const res = await fetch(`${url}/api/user`);
  const user = await res.json();
  return { user };
};

export const getAllUser = () => {
  const { data, mutate, error, isLoading } = useSWR(
    `${url}/api/user/allUser`,
    fetcher
  );

  return {
    allUser: data,
    isLoading,
    mutate,
  };
};

export const getPosts = () => {
  const { data, mutate, error, isLoading } = useSWR(
    `${url}/api/posts`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    postMutate: mutate,
  };
};

export const getAllOtherPosts = (slug) => {
  const { data, mutate, error, isLoading } = useSWR(
    `${url}/api/posts/${slug || ""}`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    otherPostMutate: mutate,
  };
};
