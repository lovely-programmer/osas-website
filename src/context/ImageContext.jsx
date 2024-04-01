"use client";

import { createContext, useReducer } from "react";

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
    id: "",
    imageUrl: "",
    pathname: getFromLocalStorage(),
  };

  const imageReducer = (state, action) => {
    switch (action.type) {
      case "VIEW_IMAGE":
        return {
          id: action.payload.id,
          imageUrl: action.payload.image,
          pathname: action.payload.pathname,
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
