import React, { createContext, useEffect, useState } from "react";

const RouteHistoryContext = createContext();

export const RouteHistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => console.log("history:", history), [history]);

  const addToHistory = (route) => {
    setHistory((prevHistory) => {
      const newArray = [...prevHistory, route];
      if (newArray.length > 5) {
        newArray.shift();
      }
      return newArray;
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <RouteHistoryContext.Provider
      value={{ history, addToHistory, clearHistory }}
    >
      {children}
    </RouteHistoryContext.Provider>
  );
};

export default RouteHistoryContext;
