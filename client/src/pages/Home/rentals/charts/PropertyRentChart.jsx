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

const PropertyRentChart = (props) => {
  const data = [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label tooltip-text">{`Year: ${label}`}</p>
          <p className="tooltip-text">{`Price: $${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  for (let price of props.prices) {
    if (price.admin_status === "approved") {
      data.push({
        date: price.date.substring(0, 4),
        price: price.price,
      });
    }
  }

  return (
    <div>
      <div className="chart-title">Price history:</div>
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

          <Area dataKey="price" stroke="#5AB8F8" fill="url(#color)" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" opacity={0.75} />
          <XAxis
            dataKey="date"
            ticks={["2014", "2016", "2018", "2020", "2022", "2024"]}
          />
          <YAxis
            dataKey="price"
            domain={[
              parseInt(data[0].price) - 500,
              parseInt(data[data.length - 1].price) + 200,
            ]}
            tickCount={6}
            tickFormatter={(price) => `$${price}`}
          />
          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{ outline: "none" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PropertyRentChart;
