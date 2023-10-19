import { useContext, useLayoutEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CryptoContext } from "../../context/CryptoContext";

const LineChartData = ({ id }) => {
  const [chartData, setChartData] = useState();
  const [type, setType] = useState("prices");
  const [days, setDays] = useState(7);
  const { currency } = useContext(CryptoContext);

  const currencyConverter = (item) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 5,
    }).format(item);
  };

  useLayoutEffect(() => {
    const getChartData = async (coinid, days) => {
      try {
        const url = `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=usd&days=${days}&interval=daily`;
        const response = await fetch(url);
        const data = await response.json();

        const convertedData = data[type].map((item) => ({
          date: new Date(item[0]).toLocaleDateString(),
          [type]: item[1],
        }));

        setChartData(convertedData);
      } catch (error) {
        console.log(error);
      }
    };

    getChartData(id, days);
  }, [id, type, days]);

  const CustomTooltip = ({ payload, label, active }) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="text-white text-sm text-center">
          <p className="font-light">{label}</p>
          <h2 className="text-md font-bold text-emerald-400">
            {currencyConverter(payload[0].value)}
          </h2>
        </div>
      );
    }
  };

  const RenderButtons = () => (
    <div className="mt-3 flex sm:justify-between text-gray-100 w-full flex-wrap">
      <button
        className={`sm:text-base ml-2 mr-2 my-1 text-sm ${
          type === "prices"
            ? "bg-cyan px-2 py-0.5 rounded-md bg-opacity-30 text-cyan"
            : ""
        }`}
        onClick={() => setType("prices")}
      >
        Price
      </button>
      <button
        className={`sm:text-base ml-2 mr-2 my-1 text-sm ${
          type === "market_caps"
            ? "bg-cyan px-2 py-0.5 rounded-md bg-opacity-30 text-cyan"
            : ""
        }`}
        onClick={() => setType("market_caps")}
      >
        Market Cap
      </button>
      <button
        className={`sm:text-base ml-2 mr-2 my-1 text-sm ${
          type === "total_volumes"
            ? "bg-cyan px-2 py-0.5 rounded-md bg-opacity-30 text-cyan"
            : ""
        }`}
        onClick={() => setType("total_volumes")}
      >
        Total Volume
      </button>

      <button
        className={`sm:text-base ml-2 mr-2 my-1 text-sm ${
          days === 7
            ? "bg-cyan px-2 py-0.5 rounded-md bg-opacity-30 text-cyan"
            : ""
        }`}
        onClick={() => setDays(7)}
      >
        7d
      </button>
      <button
        className={`sm:text-base ml-2 mr-2 my-1 text-sm ${
          days === 14
            ? "bg-cyan px-2 py-0.5 rounded-md bg-opacity-30 text-cyan"
            : ""
        }`}
        onClick={() => setDays(14)}
      >
        14d
      </button>
      <button
        className={`sm:text-base ml-2 mr-2 my-1 text-sm ${
          days === 30
            ? "bg-cyan px-2 py-0.5 rounded-md bg-opacity-30 text-cyan"
            : ""
        }`}
        onClick={() => setDays(30)}
      >
        30d
      </button>
    </div>
  );

  const renderLineChart = () => (
    <>
      <div className="h-[90%]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={600}
            height={300}
            data={chartData}
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          >
            <Line
              type="monotone"
              dataKey={type}
              stroke="#14ffec"
              strokeWidth={1}
            />
            <CartesianGrid stroke="#323232" />
            <XAxis dataKey="date" hide />
            <YAxis datakey={type} hide domain={["auto", "auto"]} />
            <Tooltip cursor={false} content={<CustomTooltip />} />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <RenderButtons />
    </>
  );

  return (
    <div className="w-full h-[43%] sm:h-[70%] mt-16 sm:mt-8">
      {chartData ? renderLineChart() : null}
    </div>
  );
};

export default LineChartData;
