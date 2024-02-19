"use client";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const url = "https://student-support.onrender.com";

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

export const getAUser = (email) => {
  const { data, error, isLoading } = useSWR(`${url}/api/user`, fetcher);

  return {
    user: data,
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
