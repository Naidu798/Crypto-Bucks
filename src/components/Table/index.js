import { useContext } from "react";
import { CryptoContext } from "../../context/CryptoContext";
import { AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SavedContext } from "../../context/SavedContext";

const Table = () => {
  const { cryptoData, currency, cryptoApiStatus, getCryptoData } =
    useContext(CryptoContext);
  const { saveCoinItem, savedCoinsList, removeCoinItem } =
    useContext(SavedContext);

  const changeColorOnValue = (val) => {
    if (val < 0) {
      return "text-red";
    }
    return "text-green";
  };
  const renderLoading = () => (
    <div className="border border-gray-100 h-[60vh] flex items-center justify-center mt-16 sm:mt-4 rounded-md">
      <div className="flex items-center">
        <p className="h-8 w-8 sm:h-10 sm:w-10 border-4 border-cyan rounded-full border-b-gray-300 mr-3 animate-spin"></p>
        <span className="text-white text-md">Loading Data...</span>
      </div>
    </div>
  );

  const onTryAgain = () => {
    getCryptoData();
  };

  const renderErrorMsg = () => (
    <div className="border border-gray-100 h-[60vh] flex items-center justify-center mt-16 sm:mt-4 rounded-md text-center">
      <div>
        <p className="text-[18px] sm:text-lg text-gray-100 font-semibold leading-8 sm:leading-10">
          Something Went Wrong With API <br /> Please Try After Sometime
        </p>
        <button
          onClick={onTryAgain}
          className="bg-cyan text-cyan font-normal py-0.5 px-4 rounded-md text-base bg-opacity-20 mt-5"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const savedCoinClass = (id) => {
    if (savedCoinsList.includes(id)) {
      return "text-cyan";
    }
    return "";
  };

  const renderTable = () => {
    return (
      <table className="w-full border border-gray-100 sm:mt-6 md:mt-7 rounded-lg text-center mt-16">
        <thead className="text-gray-100 capitalize font-bold text-base md:text-md border border-gray-100 rounded-md">
          <tr>
            <th className="py-2">asset</th>
            <th className="py-2">name</th>
            <th className="py-2">price</th>
            <th className="py-2 md:table-cell hidden">total volume</th>
            <th className="py-2 sm:table-cell hidden">marcket cap change</th>
            <th className="py-2 lg:table-cell hidden">1H</th>
            <th className="py-2 lg:table-cell hidden">24H</th>
            <th className="py-2 lg:table-cell hidden">7D</th>
          </tr>
        </thead>
        <tbody className="text-[15px] sm:text-base lg:text-md">
          {cryptoData.map((eachCoin) => {
            const { name, id, image, symbol } = eachCoin;

            const onHandleSave = () => {
              if (savedCoinsList.includes(id)) {
                removeCoinItem(id);
              } else {
                saveCoinItem(id);
              }
            };

            return (
              <tr className="border border-gray-100" key={id}>
                <td>
                  <div className="flex items-center">
                    <button onClick={onHandleSave} className="text-gray-100">
                      <AiOutlineStar
                        className={`w-7 h-7 sm:w-8 sm:h-8 ml-1 sm:ml-3 ${savedCoinClass(
                          id
                        )}`}
                      />
                    </button>
                    <Link to={`/${eachCoin.id}`} className="flex items-center">
                      <img
                        src={image}
                        alt="name"
                        className="w-7 sm:w-9 ml-1 sm:ml-2 mr-2 sm:mr-3 py-3"
                      />
                      <span className="capitalize text-[15px] sm:text-md">
                        {symbol}
                      </span>
                    </Link>
                  </div>
                </td>
                <td className="text-[15px] sm:text-md">{name}</td>
                <td className="text-[14px] sm:text-md mr-0.5 sm:mr-0">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: currency,
                  }).format(eachCoin.current_price)}
                </td>
                <td className="md:table-cell hidden">
                  {eachCoin.total_volume}
                </td>
                <td
                  className={`${changeColorOnValue(
                    eachCoin.market_cap_change_percentage_24h
                  )} sm:table-cell hidden`}
                >
                  {eachCoin.market_cap_change_percentage_24h}%
                </td>
                <td
                  className={`${changeColorOnValue(
                    eachCoin.price_change_percentage_1h_in_currency
                  )} lg:table-cell hidden`}
                >
                  {Number(
                    eachCoin.price_change_percentage_1h_in_currency
                  ).toFixed(2)}
                </td>
                <td
                  className={`${changeColorOnValue(
                    eachCoin.price_change_percentage_24h_in_currency
                  )} lg:table-cell hidden`}
                >
                  {Number(
                    eachCoin.price_change_percentage_24h_in_currency
                  ).toFixed(2)}
                </td>
                <td
                  className={`${changeColorOnValue(
                    eachCoin.price_change_percentage_7d_in_currency
                  )} pr-2 lg:table-cell hidden`}
                >
                  {Number(
                    eachCoin.price_change_percentage_7d_in_currency
                  ).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const renderResult = () => {
    switch (cryptoApiStatus) {
      case "fetching":
        return renderLoading();
      case "completed":
        return renderTable();
      case "rejected":
        return renderErrorMsg();
      default:
        return null;
    }
  };

  return renderResult();
};

export default Table;
