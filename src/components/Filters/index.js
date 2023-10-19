import { useContext, useState } from "react";
import { BsBoxArrowInRight } from "react-icons/bs";
import { BiReset } from "react-icons/bi";
import Search from "../Search";
import { CryptoContext } from "../../context/CryptoContext";

const currencies = [
  "aed",
  "ars",
  "aud",
  "bch",
  "bdt",
  "bhd",
  "bmd",
  "bnb",
  "brl",
  "btc",
  "cad",
  "chf",
  "clp",
  "cny",
  "czk",
  "dkk",
  "dot",
  "eos",
  "eth",
  "eur",
  "gbp",
  "hkd",
  "huf",
  "idr",
  "ils",
  "inr",
  "jpy",
  "krw",
  "kwd",
  "lkr",
  "ltc",
  "mmk",
  "mxn",
  "myr",
  "ngn",
  "nok",
  "nzd",
  "php",
  "pkr",
  "pln",
  "rub",
  "sar",
  "sek",
  "sgd",
  "thb",
  "try",
  "twd",
  "uah",
  "usd",
  "vef",
  "vnd",
  "xag",
  "xau",
  "xdr",
  "xlm",
  "xrp",
  "yfi",
  "zar",
];
let currenciesData = currencies.map((item) => {
  let newCurrency = { id: item.toUpperCase(), name: item, value: item };
  return newCurrency;
});

const capitalizeString = (val) => {
  return val.slice(0, 1).toUpperCase() + val.slice(1, 3);
};
let placeHolder = "Usd";

let currenciesFilterResults = currenciesData;

const Filters = () => {
  const {
    setCurrency,
    setSortBy,
    resetCryptoPage,
    setIsFocused,
    isFocused,
    sortBy,
  } = useContext(CryptoContext);
  const [convertInput, setConvertInput] = useState("");

  const renderConverter = () => {
    const onSubmitCurrency = (event) => {
      if (convertInput.length === 3 && currenciesFilterResults.length > 0) {
        event.preventDefault();
        placeHolder = capitalizeString(convertInput);
        setCurrency(convertInput);
        setConvertInput("");
        currenciesFilterResults = currenciesData;
      } else {
        alert("Please enter valid currency");
      }
    };

    const onHandleFocus = () => {
      setIsFocused(true);
    };

    const filteredResults = (val) => {
      let results = currenciesData.filter((item) => item.value.includes(val));
      return results;
    };

    const onHandleInput = (e) => {
      e.preventDefault();
      setConvertInput(e.target.value);
      currenciesFilterResults = filteredResults(e.target.value);
    };

    return (
      <form className="flex items-center">
        <label htmlFor="convert">Currency : </label>
        <input
          type="text"
          className="w-16 h-7 pl-2 bg-gray-200 text-white font-normal text-sm rounded-md ml-2 outline-none hover:border hover:border-cyan"
          placeholder={placeHolder}
          id="convert"
          value={convertInput}
          onFocus={onHandleFocus}
          onChange={onHandleInput}
          onClick={(e) => e.stopPropagation()}
          autoComplete="off"
        />
        <button
          type="button"
          className="outline-none border-collapse"
          onClick={onSubmitCurrency}
        >
          <BsBoxArrowInRight className="h-7 w-6 text-green ml-2 mb-0.5 cursor-pointer" />
        </button>
        {isFocused &&
        convertInput.length < 4 &&
        currenciesFilterResults.length > 0 ? (
          <ul className="w-24 sm:w-[15%] z-10 md:w-[14%] lg:w-[10%] min-h-16 max-h-[30vh] absolute top-10 bg-gray-200 bg-opacity-20 backdrop-blur-lg rounded-md mt-3 overflow-y-auto py-2 pl-2 scroll ml-20 scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-100">
            {currenciesFilterResults.map((eachItem) => {
              const onHandleSelectItem = () => {
                setConvertInput(eachItem.value);
                setIsFocused(false);
              };

              return (
                <li
                  key={eachItem.id}
                  className="capitalize text-base py-1 font-nunito text-gray-400 hover:bg-gray-100 hover:bg-opacity-20 rounded-md pl-2"
                  onClick={onHandleSelectItem}
                >
                  {eachItem.name}
                </li>
              );
            })}
          </ul>
        ) : null}
      </form>
    );
  };

  const renderSortBy = () => {
    const onSortBy = (e) => {
      setSortBy(e.target.value);
    };

    return (
      <div className="lg:w-[28%] sm:w-[40%] sm:block absolute top-16 left-0 sm:top-0 sm:relative w-full">
        <label className="flex items-center w-full lg:w-full">
          <p className="mr-3 text-base w-[90px] lg:w-24 lg:mr-0">Sort By : </p>
          <select
            className="h-7 sm:h-8 w-full bg-gray-200 text-white capitalize text-[15px] sm:text-base outline-none pl-2 rounded-md relative lg:ml-0"
            onChange={onSortBy}
            value={sortBy}
            defaultValue={"market_cap_desc"}
          >
            <option value="market_cap_desc" className="option">
              market cap desc
            </option>
            <option value="market_cap_asc" className="option">
              market cap asc
            </option>
            <option value="volume_desc" className="option">
              volume desc
            </option>
            <option value="volume_asc" className="option">
              volume asc
            </option>
            <option value="id_desc" className="option">
              id desc
            </option>
            <option value="id_asc" className="option">
              id asc
            </option>
          </select>
        </label>
      </div>
    );
  };

  const handleReset = () => {
    resetCryptoPage();
    placeHolder = "Usd";
    setConvertInput("");
  };

  const renderReset = () => (
    <div>
      <button
        type="button"
        className="outline-none border-collapse"
        onClick={handleReset}
      >
        <BiReset className="text-cyan h-8 w-8" />
      </button>
    </div>
  );

  return (
    <section className="w-full flex items-center justify-between lg:border py-2 lg:border-gray-100 rounded mt-0.5 lg:mt-8 lg:px-4 relative">
      <div className="sm:hidden lg:block hidden lg:w-[35%]">
        <Search />
      </div>
      {renderConverter()}
      {renderSortBy()}
      {renderReset()}
    </section>
  );
};

export default Filters;
