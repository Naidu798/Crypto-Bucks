import Table from "../Table";
import Filters from "../Filters";

import Pagination from "../Pagination";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { CryptoContext } from "../../context/CryptoContext";

const Crypto = () => {
  const { setIsFocused } = useContext(CryptoContext);
  return (
    <div className="w-full" onClick={() => setIsFocused(false)}>
      <div className="table_and-filters_container px-3">
        <Filters />
        <Table />
      </div>
      <Pagination />
      <Outlet />
    </div>
  );
};

export default Crypto;
