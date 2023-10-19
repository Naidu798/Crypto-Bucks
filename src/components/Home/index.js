import { Outlet, useLocation } from "react-router-dom";
import { CryptoProvider } from "../../context/CryptoContext";
import { TrendingProvider } from "../../context/TrendingContext";
import Logo from "../Logo";
import Navigation from "../Navigation";
import { SavedProvider } from "../../context/SavedContext";
import Search from "../Search";

const Home = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  let hideSearch = "hidden";
  if (currentPath === "/") {
    hideSearch = "block";
  }

  return (
    <CryptoProvider>
      <TrendingProvider>
        <SavedProvider>
          <main className="bg-gray-300 width-full min-h-[100vh] text-white px-2 sm:px-8 md:px-[10%] py-3 relative font-nunito">
            <div className="flex flex-col align-middle items-center">
              <Logo />
              <Navigation />
              <div className={`lg:hidden w-full mt-8 px-3 ${hideSearch}`}>
                <Search />
              </div>
              <Outlet />
            </div>
          </main>
        </SavedProvider>
      </TrendingProvider>
    </CryptoProvider>
  );
};

export default Home;
