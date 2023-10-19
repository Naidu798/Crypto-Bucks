import { NavLink, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const activeClass = "bg-cyan text-black";
  const inActiveClass = "bg-gray-200 text-gray-100 hover:text-cyan";

  const crypto = currentPath === "/" ? activeClass : inActiveClass;
  const trending = currentPath === "/trending" ? activeClass : inActiveClass;
  const saved = currentPath === "/saved" ? activeClass : inActiveClass;

  return (
    <nav className="w-[100%] sm:w-full md:w-full lg:w-[65%] border border-cyan text-center flex items-center justify-around sm:mt-16 md:mt-20 sm:py-2 py-2 rounded-md mt-14">
      <NavLink
        to="/"
        className={`font-bold sm:text-md text-base px-5 py-0 sm:px-[8%] md:px-[10%] sm:py-0.5 rounded-md ${crypto}`}
      >
        Crypto
      </NavLink>
      <NavLink
        to="trending"
        className={`font-bold sm:text-md text-base px-5 py-0 sm:px-[8%] md:px-[10%] sm:py-0.5 rounded-md ${trending}`}
      >
        Trending
      </NavLink>
      <NavLink
        to="/saved"
        className={`font-bold sm:text-md text-base px-5 py-0 sm:px-[8%] md:px-[10%] sm:py-0.5 rounded-md ${saved}`}
      >
        Saved
      </NavLink>
    </nav>
  );
};

export default Navigation;
