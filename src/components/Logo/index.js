import { Link } from "react-router-dom";

const Logo = () => (
  <Link to="/">
    <logo className="flex items-center absolute left-2 sm:left-[8%] md:left-[10%]">
      <img
        src="https://crypto-bucks.netlify.app/static/media/logo.2ce8e122c6cf18ca3c25b2b663398aab.svg"
        alt="wesite logo"
        className="w-10 md:w-12"
      />
      <h1 className="text-cyan text-lg first-letter:text-red first-letter:font-bold font-semibold sm:text-3xl">
        CryptoBucks
      </h1>
    </logo>
  </Link>
);

export default Logo;
