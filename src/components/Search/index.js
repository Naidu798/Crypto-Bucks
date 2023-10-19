import { useContext } from "react";
import debounce from "lodash.debounce";
import { CryptoContext } from "../../context/CryptoContext";
import { BiSearch } from "react-icons/bi";

const RenderSearch = ({ handlerSearch }) => {
  const {
    searchData,
    setCoinSearch,
    searchValue,
    setSearchValue,
    searchApiStatus,
    setSearchData,
  } = useContext(CryptoContext);

  const onSearchInput = (event) => {
    const searchVal = event.target.value;
    setSearchValue(searchVal);
    setSearchData([]);
    handlerSearch(searchVal);
  };

  const handleSearchSubmit = () => {
    handlerSearch(searchValue);
  };

  const renderLoaderOrError = () => {
    return searchValue.length > 0 &&
      searchApiStatus === "no-data" &&
      searchData.length === 0 ? (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-md text-neutral-400">No Search Data Found</p>
      </div>
    ) : (
      <div className="h-full flex justify-center items-center">
        <div className="h-6 w-6 border-4 border-cyan rounded-[50%] border-b-gray-200 animate-spin mr-2"></div>
        loading...
      </div>
    );
  };

  const renderSearchResult = () => {
    const onSearchItem = (coin) => {
      setCoinSearch(coin);
      setSearchValue("");
    };

    return (
      <ul className="lg:w-full lg:h-96 h-80 absolute bg-gray-200 bg-opacity-50 backdrop-blur-lg rounded-md mt-3 overflow-y-auto py-2 pl-3 scroll scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-100 w-full z-10">
        {searchData.length > 0
          ? searchData.map((data) => (
              <li
                className="flex items-center mb-2 hover:bg-gray-200 py-1 rounded-md pl-2"
                key={data.id}
                onClick={() => onSearchItem(data.id)}
              >
                <img
                  src={data.thumb}
                  alt="name"
                  className="mr-3 h-8 w-8 cursor-pointer"
                />
                <span className="cursor-pointer">{data.name}</span>
              </li>
            ))
          : renderLoaderOrError()}
      </ul>
    );
  };

  return (
    <div className="lg:w-full w-full relative">
      <div className="flex items-center">
        <input
          type="text"
          className="w-full h-8 outline-none bg-gray-200 pl-3 text-white font-normal rounded-md"
          placeholder="Search Coin"
          value={searchValue}
          onChange={onSearchInput}
        />
        <BiSearch
          className="w-5 h-5 absolute lg:right-2 text-cyan cursor-pointer mt-0.5 right-[2%]"
          onClick={handleSearchSubmit}
        />
      </div>
      {searchValue.length > 0 ? renderSearchResult() : null}
    </div>
  );
};

const Search = () => {
  const { getSearchResult } = useContext(CryptoContext);

  const debounceFunc = debounce(function (val) {
    getSearchResult(val);
  }, 2000);

  return <RenderSearch handlerSearch={debounceFunc} />;
};

export default Search;
