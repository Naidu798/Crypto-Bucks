import { React, useState, createContext, useLayoutEffect } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [coinDetails, setCoinDetails] = useState();

  const [cryptoApiStatus, setCyptoApiStatus] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [coinSearch, setCoinSearch] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("marcket_cap_desc");
  const [activePage, setActivePage] = useState(1);
  const [totalCoins, setTotalCoins] = useState(250);
  const [perPage, setPerPage] = useState(10);
  const [searchApiStatus, setSearchApiStatus] = useState();
  const [isFocused, setIsFocused] = useState(false);

  const getCoinData = async (coinId) => {
    setCoinDetails();
    try {
      const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`;
      const response = await fetch(url);
      const data = await response.json();
      setCoinDetails(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTotalCoins = async () => {
    try {
      const url = `https://api.coingecko.com/api/v3/coins/list`;
      const response = await fetch(url);
      const data = await response.json();
      setTotalCoins(data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const getSearchResult = async (searchInput) => {
    if (searchInput === "") {
      setSearchData([]);
    } else {
      try {
        setSearchApiStatus("fetching");
        const url = `https://api.coingecko.com/api/v3/search?query=${searchInput}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.coins.length > 0) {
          setSearchData(data.coins);
          setSearchApiStatus("completed");
        } else {
          setSearchApiStatus("no-data");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getCryptoData = async () => {
    setCyptoApiStatus("fetching");
    try {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${activePage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`;
      const response = await fetch(url);
      const data = await response.json();
      setCryptoData(data);
      setCyptoApiStatus("completed");
    } catch (err) {
      setCyptoApiStatus("rejected");
    }
  };

  const resetCryptoPage = () => {
    setCurrency("usd");
    setSortBy("marcket_cap_desc");
    setSearchValue("");
    setSearchData([]);
    setCoinSearch("");
    setPerPage(10);
  };

  useLayoutEffect(() => {
    getTotalCoins();
    getCryptoData();
  }, [coinSearch, currency, sortBy, activePage, perPage]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        getSearchResult,
        setCoinSearch,
        currency,
        setCurrency,
        setSortBy,
        searchValue,
        setSearchValue,
        setSearchData,
        activePage,
        setActivePage,
        totalCoins,
        setPerPage,
        perPage,
        coinDetails,
        getCoinData,
        searchApiStatus,
        resetCryptoPage,
        isFocused,
        setIsFocused,
        cryptoApiStatus,
        getCryptoData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
