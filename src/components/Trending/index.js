import { useContext } from "react";
import { TrendingContext } from "../../context/TrendingContext";
import { Outlet, useNavigate } from "react-router-dom";
import { BiReset } from "react-icons/bi";

const Trending = () => {
  const { trendingData, resetFunction } = useContext(TrendingContext);
  const navigate = useNavigate();

  const getCoinDetails = (id) => {
    navigate(id);
  };

  const handleTrendingReset = () => {
    resetFunction();
  };

  const currencyConverter = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "btc",
      maximumSignificantDigits: 5,
    }).format(val);
  };

  const renderLoading = () => (
    <div className="border border-gray-100 h-[60vh] flex items-center justify-center rounded-md">
      <div className="flex items-center">
        <p className="w-8 h-8 sm:h-10 sm:w-10 border-4 border-cyan rounded-full border-b-gray-300 mr-3 animate-spin"></p>
        <span className="text-white text-md sm:text-lg">Loading Data...</span>
      </div>
    </div>
  );

  return (
    <section className="w-full px-2 sm:px-0">
      <div className="mt-10 sm:mt-6 text-right">
        <button
          type="button"
          className="outline-none border-collapse"
          onClick={handleTrendingReset}
        >
          <BiReset className="text-cyan sm:h-10 sm:w-10 w-8 h-8" />
        </button>
      </div>
      {trendingData ? (
        <ul className="border border-gray-100 rounded-md min-h-[60vh] w-full mt-2 flex justify-evenly px-[4vw] lg:px-[1vw] py-[4vh] flex-wrap flex-col lg:flex-row items-center">
          {trendingData.map((eachCoin) => {
            return (
              <li
                key={eachCoin.item.id}
                className="w-[90%] sm:w-[80%] lg:w-[45%] bg-gray-100 rounded-md px-5 py-5 lg:py-8 mb-10 sm:mb-10 lg:mb-8 last:mb-0 ml-3 mr-3 bg-opacity-10 hover:bg-gray-100 hover:bg-opacity-30 text-gray-100 text-base relative"
                onClick={() => getCoinDetails(eachCoin.item.id)}
              >
                <h3 className="flex items-center">
                  <span>Name :</span>
                  <span className="ml-1.5 text-cyan font-bold sm:text-md text-sm">
                    {eachCoin.item.name}
                  </span>
                  <img
                    src={eachCoin.item.small}
                    alt={eachCoin.item.name}
                    className="w-7 rounded-2xl ml-3"
                  />
                </h3>
                <h3>
                  <span>Market Cap Rank : </span>
                  <span className="ml-1 text-cyan font-bold sm:text-md text-sm">
                    {eachCoin.item.market_cap_rank}
                  </span>
                </h3>
                <h3>
                  <span>Price ( In BTC ) : </span>
                  <span className="ml-1 text-cyan font-bold sm:text-md text-sm">
                    {currencyConverter(eachCoin.item.price_btc)}
                  </span>
                </h3>
                <h3>
                  <span>Score : </span>
                  <span className="ml-1 text-cyan font-bold sm:text-md text-sm">
                    {eachCoin.item.score}
                  </span>
                </h3>
                <img
                  src={eachCoin.item.large}
                  alt={eachCoin.item.name}
                  className="w-[20%] sm:w-[18%] lg:w-[30%] rounded-full h-auto absolute top-6 sm:top-1/4 lg:top-2/4 -right-14 -translate-y-2/4 mr-9 sm:mr-7"
                />
              </li>
            );
          })}
        </ul>
      ) : (
        renderLoading()
      )}
      <p className="text-white py-3">
        Data provided by{" "}
        <a
          href="http://www.coingecko.com"
          target="_blank"
          rel="noreferrer"
          className="text-cyan"
        >
          CoinGecko
        </a>
      </p>
      <Outlet />
    </section>
  );
};

export default Trending;
