"use client";

import { createContext, useEffect, useReducer } from "react";

export const ImageContext = createContext();

const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("pathname")
      ? localStorage.getItem("pathname")
      : "/";

    return value;
  }
};

export const ImageContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    imageUrl: "",
    pathname: getFromLocalStorage(),
  };

  const imageReducer = (state, action) => {
    switch (action.type) {
      case "VIEW_IMAGE":
        return {
          imageUrl: action.payload,
          pathname: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(imageReducer, INITIAL_STATE);

  return (
    <ImageContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ImageContext.Provider>
  );
};
