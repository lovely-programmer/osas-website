"use client";

import { createContext, useEffect, useState } from "react";

export const MultiplePageContext = createContext();

const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("currentIndex")
      ? localStorage.getItem("currentIndex")
      : 0;

    return parseInt(value);
  }
};

export const MultiplePageContextProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    return getFromLocalStorage();
  });

  useEffect(() => {
    localStorage.setItem("currentIndex", currentIndex);
  }, [currentIndex]);

  const [steps, setSteps] = useState([]);

  const next = () => {
    setCurrentIndex((prev) => {
      return prev + 1;
    });
  };

  const multiplePage = (data) => {
    setSteps(data);
  };

  const step = steps[currentIndex];

  return (
    <MultiplePageContext.Provider
      value={{ currentIndex, multiplePage, step, next, steps }}
    >
      {children}
    </MultiplePageContext.Provider>
  );
};
