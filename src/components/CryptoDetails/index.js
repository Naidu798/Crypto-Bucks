import { useContext, useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { BsTriangleFill, BsFacebook } from "react-icons/bs";
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillRedditCircle,
} from "react-icons/ai";
import { CryptoContext } from "../../context/CryptoContext";
import LineChartData from "../LineChartData";

const CryptoDetails = () => {
  const { getCoinData, coinDetails, currency } = useContext(CryptoContext);
  const { coinId } = useParams();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    getCoinData(coinId);
  }, [coinId]);

  const stop = () => {
    navigate("..");
  };

  const currencyConverterPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      maximumSignificantDigits: 5,
    }).format(price);
  };

  const currencyConverterDiluted = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      notation: "compact",
    }).format(price);
  };

  const currencyConverter = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const currencyConverterLowAndHigh = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 5,
    }).format(price);
  };

  const roundValue = (value) => {
    return Number(value).toFixed(2);
  };

  let rot = "";
  const changeColor = (val) => {
    if (val < 0) {
      rot = "rotate-180 mt-0.5";
      return "bg-red bg-opacity-25 text-red";
    } else {
      rot = "";
    }
    return "bg-green bg-opacity-50 text-green";
  };

  const LowHighIndicator = ({ currentPrice, high, low }) => {
    const [green, setGreen] = useState();

    useEffect(() => {
      const total = high - low;
      const greenZone = Math.ceil(((high - currentPrice) * 100) / total);
      setGreen(greenZone);
    }, [green]);

    return (
      <div className="flex items-center mt-4">
        <div
          className="h-1.5 rounded-l-lg bg-red w-[50%]"
          style={{ width: `${100 - green}%` }}
        >
          &nbsp;
        </div>
        <div
          className="h-1.5 rounded-r-lg bg-green w-[50%]"
          style={{ width: `${green}%` }}
        >
          &nbsp;
        </div>
      </div>
    );
  };

  const sideHeading = "text-gray-100 font-normal text-base";

  const RenderLeftPart = () => (
    <div>
      <div className="flex items-center mb-8">
        <img
          src={coinDetails.image.large}
          alt={coinDetails.id}
          className="w-[3rem]"
        />
        <h2 className="text-xl pl-2">{coinDetails.name}</h2>
        <span className="uppercase bg-cyan px-2.5 py-0.5 rounded-md ml-2 bg-opacity-30 text-sm mt-1 text-cyan">
          {coinDetails.symbol}
        </span>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p className={`${sideHeading}`}>Price</p>
          <div
            className={`font-light flex items-center rounded-md px-1.5 ${changeColor(
              coinDetails.market_data.market_cap_change_percentage_24h
            )}`}
          >
            {roundValue(
              coinDetails.market_data.market_cap_change_percentage_24h
            )}
            %
            <span>
              <BsTriangleFill className={`w-3 h-3 mb-1 ml-1 ${rot}`} />
            </span>
          </div>
        </div>
        <h2 className="text-lg font-bold mt-0.5">
          {currencyConverterPrice(
            coinDetails.market_data.current_price[currency]
          )}
        </h2>
      </div>
      <div className="flex sm:items-center justify-between flex-col sm:flex-row items-start mt-4">
        <div>
          <p className={`${sideHeading}`}>Market Cap</p>
          <h2 className="text-white font-bold sm:text-md text-[16px]">
            {currencyConverter(coinDetails.market_data.market_cap[currency])}
          </h2>
        </div>
        <div>
          <p className={`${sideHeading} mt-4 sm:mt-0`}>
            Fully Diluted Valution
          </p>
          <h2 className="text-white font-bold sm:text-md text-[16px]">
            {currencyConverterDiluted(
              coinDetails.market_data.fully_diluted_valuation[currency]
            )}
          </h2>
        </div>
      </div>
      <div className="mt-4">
        <p className={`${sideHeading}`}>Total Volume</p>
        <h2 className="text-white font-bold sm:text-md text-[16px]">
          {currencyConverter(coinDetails.market_data.total_volume[currency])}
        </h2>
      </div>
      <div className="">
        <LowHighIndicator
          currentPrice={coinDetails.market_data.current_price[currency]}
          high={coinDetails.market_data.high_24h[currency]}
          low={coinDetails.market_data.low_24h[currency]}
        />
      </div>
      <div className="flex items-center justify-between mt-4">
        <div>
          <p className={`${sideHeading}`}>Low 24H</p>
          <h2 className="text-white font-bold sm:text-md text-[16px]">
            {currencyConverterLowAndHigh(
              coinDetails.market_data.low_24h[currency]
            )}
          </h2>
        </div>
        <div>
          <p className={`${sideHeading}`}>High 24H</p>
          <h2 className="text-white font-bold sm:text-md text-[16px]">
            {currencyConverterLowAndHigh(
              coinDetails.market_data.high_24h[currency]
            )}
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div>
          <p className={`${sideHeading}`}>Max Supply</p>
          <h2 className="text-white font-bold sm:text-md text-[16px]">
            {currencyConverter(coinDetails.market_data.max_supply)}
          </h2>
        </div>
        <div>
          <p className={`${sideHeading}`}>Circulating Suply</p>
          <h2 className="text-white font-bold sm:text-md text-[16px]">
            {currencyConverter(coinDetails.market_data.circulating_supply)}
          </h2>
        </div>
      </div>
      <div className="flex justify-between mt-5 items-start flex-col sm:flex-row">
        <div className="flex flex-col mt-3 w-full sm:w-fit">
          <a
            href={coinDetails?.links?.homepage[0]}
            rel="noreferrer"
            target="_blank"
            className="bg-gray-200 text-gray-100 rounded-md py-0.5 px-2 mb-1.5 text-sm"
          >
            {coinDetails?.links?.homepage[0].substring(0, 30)}
          </a>
          <a
            href={coinDetails?.links?.blockchain_site[0]}
            rel="noreferrer"
            target="_blank"
            className="bg-gray-200 text-gray-100 rounded-md py-0.5 px-2 mb-1.5 text-sm"
          >
            {coinDetails?.links?.blockchain_site[0].substring(0, 30)}
          </a>
          {coinDetails?.links?.official_forum_url[0] && (
            <a
              href={coinDetails?.links?.official_forum_url[0]}
              rel="noreferrer"
              target="_blank"
              className="bg-gray-200 text-gray-100 rounded-md py-0.5 px-2 mb-1.5 text-sm"
            >
              {coinDetails.links.official_forum_url[0].substring(0, 30)}
            </a>
          )}
        </div>
        <div className="flex flex-col w-full sm:w-fit mt-2 sm:mt-0">
          <p className={`${sideHeading} py-1 sm:py-0`}>Sentiment</p>
          <div
            className={`font-light flex items-center rounded-md px-1.5 bg-green bg-opacity-30 text-green my-1 text-sm w-full`}
          >
            {roundValue(coinDetails.sentiment_votes_up_percentage)}%
            <span>
              <BsTriangleFill className={`w-3 h-3 mb-1 ml-1`} />
            </span>
          </div>
          <div
            className={`font-light flex items-center rounded-md px-1.5 bg-red bg-opacity-25 text-red my-1 text-sm w-full`}
          >
            {roundValue(coinDetails.sentiment_votes_down_percentage)}%
            <span>
              <BsTriangleFill
                className={`w-3 h-3 mb-1 ml-1 rotate-180 mt-0.5`}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRanks = () => (
    <div className="sm:mt-5 text-base text-gray-100 font-bold mt-14">
      <p className="py-0.5">
        Market Cap Rank :{" "}
        <span className="text-white ml-2">{coinDetails.market_cap_rank}</span>
      </p>
      <p className="py-0.5">
        CoinGecko Rank :{" "}
        <span className="text-white ml-2">{coinDetails.coingecko_rank}</span>
      </p>
      <p className="py-0.5">
        CoinGecko Score :{" "}
        <span className="text-white ml-2">{coinDetails.coingecko_score}</span>
      </p>
    </div>
  );

  const renderSocialMediaLinks = () => (
    <div className="mt-10 sm:mt-1 flex justify-center items-center sm:justify-end">
      {coinDetails.links.repos_url.github[0] && (
        <a
          target="_blank"
          rel="noreferrer"
          href={coinDetails.links.repos_url.github[0]}
        >
          <AiFillGithub className="text-gray-100 px-1 h-10 w-10" />
        </a>
      )}
      {coinDetails.links.twitter_screen_name && (
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://twitter.com/${coinDetails.links.twitter_screen_name}`}
        >
          <AiFillTwitterCircle className="text-gray-100 px-1 h-10 w-10" />
        </a>
      )}
      {coinDetails.links.subreddit_url && (
        <a
          target="_blank"
          rel="noreferrer"
          href={coinDetails.links.subreddit_url}
        >
          <AiFillRedditCircle className="text-gray-100 px-1 h-10 w-10" />
        </a>
      )}
      {coinDetails.links.facebook_username && (
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://facebook.com/${coinDetails.links.facebook_username}`}
        >
          <BsFacebook className="text-gray-100 px-1 h-7 w-9" />
        </a>
      )}
    </div>
  );

  return ReactDOM.createPortal(
    <div
      className="fixed w-full h-full flex items-center bg-gray-200 justify-center top-0 font-nunito bg-opacity-30 backdrop-blur-[15px] py-7"
      onClick={stop}
    >
      <div
        className="text-white bg-gray-300 w-[88%] lg:w-[76%] h-full sm:h-[90%] lg:h-[95%] bg-opacity-75 rounded-lg relative flex flex-col px-2 md:px-0"
        onClick={(e) => e.stopPropagation()}
      >
        {coinDetails ? (
          <div className="w-full h-full p-2 sm:p-4 flex md:flex-row flex-col overflow-y-auto md:overflow-hidden scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-200">
            <div className="flex flex-col w-full md:w-[45%] h-full md:pr-2 mb-12 md:mb-1">
              <RenderLeftPart />
            </div>
            <div className="flex flex-col w-full md:w-[55%] h-full md:pl-5 mt-5 md:mt-1">
              <LineChartData id={coinId} />
              {renderRanks()}
              {renderSocialMediaLinks()}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="h-8 w-8 sm:h-10 sm:w-10 border-4 border-cyan rounded-full border-b-gray-300 mr-3 animate-spin"></p>
            <span className="text-md sm:text-lg text-stone-200">
              Getting Data...
            </span>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("model")
  );
};

export default CryptoDetails;
