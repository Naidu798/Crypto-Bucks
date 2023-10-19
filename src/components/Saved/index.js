import { useContext } from "react";
import { SavedContext } from "../../context/SavedContext";
import { AiOutlineStar } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { CryptoContext } from "../../context/CryptoContext";
import { Outlet, useNavigate } from "react-router-dom";

const Saved = () => {
  const {
    savedCoinsList,
    savedCoinsData,
    saveCoinItem,
    resetSaved,
    removeCoinItem,
    apiStatus,
  } = useContext(SavedContext);
  const { currency } = useContext(CryptoContext);
  const navigate = useNavigate();

  const changeColorOnValue = (val) => {
    if (val < 0) {
      return "text-red";
    }
    return "text-green";
  };

  const renderLoading = () => (
    <div className="border border-gray-100 h-[60vh] flex items-center justify-center mt-1 rounded-md w-full">
      <div className="flex items-center">
        <p className="h-8 w-8 sm:h-10 sm:w-10 border-4 border-cyan rounded-full border-b-gray-300 mr-3 animate-spin"></p>
        <span className="text-white text-base sm:text-md">Loading Data...</span>
      </div>
    </div>
  );

  const renderNoSavedMsg = () => (
    <div className="border border-gray-100 h-[60vh] flex items-center justify-center mt-1 rounded-md w-full">
      <span className="text-gray-100 font-bold text-[17px] sm:text-md md:text-lg capitalize">
        There is no saved coins to display
      </span>
    </div>
  );

  const savedCoinClass = (id) => {
    if (savedCoinsList.includes(id)) {
      return "text-cyan";
    }
    return "";
  };

  const getCoinDetails = (id) => {
    navigate(id);
  };

  const renderTable = () => {
    return (
      <div className="w-full min-h-[59vh] border-gray-100 border border-t-0 rounded-sm">
        <table className="w-full border-gray-100 mt-1 text-center">
          <thead className="text-gray-100 capitalize font-bold text-base md:text-md border border-gray-100 border-r-0 border-l-0">
            <tr className="">
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
            {savedCoinsData.map((eachCoin) => {
              const { name, id, image, symbol } = eachCoin;

              const onHandleSave = () => {
                if (savedCoinsList.includes(id)) {
                  removeCoinItem(id);
                } else {
                  saveCoinItem(id);
                }
              };

              return (
                <tr
                  className="border border-gray-100 border-r-0 border-l-0"
                  key={id}
                >
                  <td>
                    <div className="flex items-center">
                      <button onClick={onHandleSave} className="text-gray-100">
                        <AiOutlineStar
                          className={`w-7 h-7 sm:w-8 sm:h-8 ml-1 sm:ml-3 ${savedCoinClass(
                            id
                          )}`}
                        />
                      </button>
                      <button
                        className="flex items-center"
                        onClick={() => getCoinDetails(id)}
                      >
                        <img
                          src={image}
                          alt="name"
                          className="w-7 sm:w-9 ml-1 sm:ml-2 mr-2 sm:mr-3 py-3"
                        />
                        <span className="capitalize text-[15px] sm:text-md">
                          {symbol}
                        </span>
                      </button>
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
      </div>
    );
  };

  const handleSavedReset = () => {
    resetSaved();
  };

  const renderResult = () => {
    switch (apiStatus) {
      case "fetching":
        return renderLoading();
      case "completed":
        return savedCoinsData ? renderTable() : renderNoSavedMsg();
      default:
        return null;
    }
  };

  return (
    <div className="w-full px-3 sm:px-1 md:px-0">
      <div className="mt-5 text-right">
        <button
          type="button"
          className="outline-none border-collapse"
          onClick={handleSavedReset}
        >
          <BiReset className="text-cyan md:h-10 md:w-10 h-8 w-8" />
        </button>
      </div>
      {renderResult()}
      <Outlet />
    </div>
  );
};

export default Saved;
