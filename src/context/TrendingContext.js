import { React, useState, createContext, useLayoutEffect } from "react";

export const TrendingContext = createContext({});

export const TrendingProvider = ({ children }) => {
  const [trendingData, setTrendingData] = useState([]);

  const getTrendingData = async () => {
    setTrendingData();
    try {
      const url = `https://api.coingecko.com/api/v3/search/trending`;
      const response = await fetch(url);
      const data = await response.json();
      setTrendingData(data.coins);
    } catch (err) {
      console.log(err);
    }
  };

  const resetFunction = () => {
    getTrendingData();
  };

  useLayoutEffect(() => {
    getTrendingData();
  }, []);

  return (
    <TrendingContext.Provider
      value={{
        trendingData,
        resetFunction,
      }}
    >
      {children}
    </TrendingContext.Provider>
  );
};
