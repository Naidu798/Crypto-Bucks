import { BsFillArrowRightCircleFill, BsBoxArrowInRight } from "react-icons/bs";

import { useContext, useRef } from "react";
import { CryptoContext } from "../../../src/context/CryptoContext";

const Pagination = () => {
  const {
    activePage,
    setActivePage,
    totalCoins,
    setPerPage,
    perPage,
    cryptoData,
  } = useContext(CryptoContext);

  let totalPages = parseInt(totalCoins / perPage);

  const onPrevArrow = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
      console.log(activePage);
    }
  };

  const onNextArrow = () => {
    if (totalPages > activePage) {
      setActivePage(activePage + 1);
    }
  };

  const onPrevPage = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const onNextPage = () => {
    if (totalPages > activePage) {
      setActivePage(activePage + 1);
    }
  };

  const onTotalPages = () => {
    setActivePage(totalPages);
  };

  const onFirstPage = () => {
    setActivePage(1);
  };

  const pageRef = useRef(null);

  const onSubmitPerPage = (event) => {
    event.preventDefault();
    let val = pageRef.current.value;
    setPerPage(val);
    pageRef.current.value = "";
  };

  const numberClass =
    "h-8 w-8 bg-gray-200 rounded-[50%] flex items-center justify-center text-sm cursor-pointer mr-2";
  const activePageClass =
    "h-8 w-8 bg-cyan text-black rounded-[50%] flex items-center justify-center text-sm cursor-pointer font-bold mr-2";

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-3 pb-5">
      <p className="text-white py-2 md:py-0">
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
      {cryptoData.length !== 1 ? (
        <form
          className="flex items-center py-2 md:py-0"
          onSubmit={onSubmitPerPage}
        >
          <label htmlFor="perpage">Per Page : </label>
          <input
            type="number"
            className="w-16 h-7 pl-2 bg-gray-200 outline-none text-white font-normal text-sm rounded-md ml-2"
            placeholder={perPage}
            min={1}
            max={100}
            id="perpage"
            ref={pageRef}
          />
          <button type="submit" className="outline-none border-collapse">
            <BsBoxArrowInRight className="h-7 w-6 text-green ml-2 mb-0.5 cursor-pointer" />
          </button>
        </form>
      ) : null}
      {cryptoData.length !== 1 ? (
        <ul className="flex items-center py-2 md:py-0">
          <li>
            <BsFillArrowRightCircleFill
              className="text-cyan w-6 h-6 rotate-180 cursor-pointer mr-2"
              onClick={onPrevArrow}
            />
          </li>
          {activePage > 2 ? (
            <li className={`${numberClass}`} onClick={onFirstPage}>
              1
            </li>
          ) : null}
          {activePage <= 2 ? null : (
            <li className="text-cyan text-xl mr-2">...</li>
          )}
          {activePage === 1 ? null : (
            <li className={`${numberClass}`} onClick={onPrevPage}>
              {activePage - 1}
            </li>
          )}
          <li className={`${activePageClass}`}>{activePage}</li>
          {activePage === totalPages ? null : (
            <li className={`${numberClass}`} onClick={onNextPage}>
              {activePage + 1}
            </li>
          )}
          {activePage < totalPages - 1 ? (
            <li className="text-cyan text-xl mr-2">...</li>
          ) : null}
          {activePage > totalPages - 2 ? null : (
            <li className={`${numberClass}`} onClick={onTotalPages}>
              {totalPages}
            </li>
          )}
          <li>
            <BsFillArrowRightCircleFill
              className="text-cyan h-6 w-6 cursor-pointer"
              onClick={onNextArrow}
            />
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default Pagination;
