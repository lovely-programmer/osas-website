"use client";

import { createContext, useReducer } from "react";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    text: "",
  };

  const searchReducer = (state, action) => {
    switch (action.type) {
      case "SEARCH_THINGS":
        return {
          text: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider value={{ data: state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
