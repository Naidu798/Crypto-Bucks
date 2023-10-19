import {
  React,
  useState,
  createContext,
  useLayoutEffect,
  useContext,
  useEffect,
} from "react";
import { CryptoContext } from "./CryptoContext";

export const SavedContext = createContext({});

export const SavedProvider = ({ children }) => {
  const [savedCoinsList, setSavedCoinsList] = useState([]);
  const [savedCoinsData, setSavedCoinsData] = useState([]);
  const [apiStatus, setApiStatus] = useState("completed");

  const { sortBy, currency } = useContext(CryptoContext);

  const saveCoinItem = (id) => {
    const oldCoinsList = JSON.parse(localStorage.getItem("coins"));

    if (oldCoinsList.includes(id) === false) {
      let newCoins = [...oldCoinsList, id];
      setSavedCoinsList(newCoins);
      localStorage.setItem("coins", JSON.stringify(newCoins));
    }
  };

  const removeCoinItem = (id) => {
    const oldCoinsList = JSON.parse(localStorage.getItem("coins"));

    let filterCoins = oldCoinsList.filter((coin) => coin !== id);

    setSavedCoinsList(filterCoins);
    localStorage.setItem("coins", JSON.stringify(filterCoins));
  };

  const getSavedCoinsData = async (totalCoins) => {
    setApiStatus("fetching");
    try {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(
        ","
      )}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`;
      const response = await fetch(url);
      const data = await response.json();
      setSavedCoinsData(data);
      setApiStatus("completed");
    } catch (error) {
      console.log(error);
    }
  };

  const resetSaved = () => {
    setApiStatus("fetching");
    if (savedCoinsList.length > 0) {
      getSavedCoinsData(savedCoinsList);
    }
    setApiStatus("completed");
  };

  useEffect(() => {
    if (savedCoinsList.length > 0) {
      getSavedCoinsData(savedCoinsList);
    } else {
      setSavedCoinsData();
    }
  }, [savedCoinsList]);

  useLayoutEffect(() => {
    const oldCoins = JSON.parse(localStorage.getItem("coins"));

    if (oldCoins === null) {
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      setSavedCoinsList(oldCoins);
    }
    if (oldCoins.length > 0) {
      getSavedCoinsData(oldCoins);
    }
  }, []);

  return (
    <SavedContext.Provider
      value={{
        saveCoinItem,
        savedCoinsData,
        savedCoinsList,
        resetSaved,
        removeCoinItem,
        apiStatus,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
};
