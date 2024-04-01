"use client";

import { createContext, useReducer } from "react";

export const MessagerContext = createContext();

const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const data = JSON.parse(localStorage.getItem("selectUserData"))
      ? JSON.parse(localStorage.getItem("selectUserData"))
      : null;
    return data;
  }
};

export const MessagerContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    userInfo: getFromLocalStorage(),
  };

  const messagerReducer = (state, action) => {
    switch (action.type) {
      case "SELECT_USER":
        return {
          userInfo: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(messagerReducer, INITIAL_STATE);

  return (
    <MessagerContext.Provider value={{ data: state, dispatch }}>
      {children}
    </MessagerContext.Provider>
  );
};
