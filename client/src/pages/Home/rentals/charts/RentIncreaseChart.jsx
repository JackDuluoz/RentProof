import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "./Charts.scss";

const RentIncreaseChart = (props) => {
  const data = [];
  const prices = props.prices;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label tooltip-text">{`Year: ${label}`}</p>
          <p className="tooltip-text">{`Increase percentage: ${payload[0].value}%`}</p>
          <p className="tooltip-text">{`Increase amount: $${payload[0].payload.increase_amount}`}</p>
        </div>
      );
    }
    return null;
  };

  // %R = (RF-RI)/RI *100

  for (let i = 1; i < prices.length; i++) {
    if (prices[i].admin_status === "approved") {
      data.push({
        date: prices[i].date.substring(0, 4),
        increase:
          Math.round(
            ((parseInt(prices[i].price) - parseInt(prices[i - 1].price)) /
              parseInt(prices[i - 1].price)) *
              100 *
              10
          ) / 10,
        increase_amount:
          parseInt(prices[i].price) - parseInt(prices[i - 1].price),
      });
    }
  }

  if (data.length < 2) {
    return <div>Not enough data</div>;
  }

  return (
    <div>
      <div className="chart-title">Rent increase per year:</div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5AB8F8" stopOpacity={0.75} />
              <stop offset="75%" stopColor="#5AB8F8" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <Area dataKey="increase" stroke="#5AB8F8" fill="url(#color)" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" opacity={0.75} />
          <XAxis
            dataKey="date"
            // ticks={["2014", "2016", "2018", "2020", "2022", "2024"]}
          />
          <YAxis
            dataKey="increase"
            domain={[0, 15]}
            tickCount={6}
            ticks={[3, 6, 9, 12, 15]}
            tickFormatter={(increase) => `${increase}%`}
          />
          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{ outline: "none" }}
          />
        </AreaChart>
        {/* <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis
            dataKey="price"
            domain={[
              parseInt(data[0].price) - 500,
              parseInt(data[data.length - 1].price) + 500,
            ]}
          />
          <Tooltip />
        </LineChart> */}
      </ResponsiveContainer>
    </div>
  );
};

export default RentIncreaseChart;
