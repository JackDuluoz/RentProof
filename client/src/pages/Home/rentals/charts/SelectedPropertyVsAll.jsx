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
  const properties = props.properties;
  const currentPropertyPrices = props.currentPropertyPrices;
  const averageIncreasePerYear = {
    2015: [],
    2016: [],
    2017: [],
    2018: [],
    2019: [],
    2020: [],
    2021: [],
    2022: [],
    2023: [],
  };

  for (let price of currentPropertyPrices) {
    if (price.admin_status === "approved") {
      data.push({
        date: parseInt(price.date.substring(0, 4)),
        price: parseInt(price.price),
      });
    }
  }

  const getRentIncreaseAverages = (prices, properties) => {
    const priceObject = {};
    const allIncreasesPerYear = {
      2014: [],
      2015: [],
      2016: [],
      2017: [],
      2018: [],
      2019: [],
      2020: [],
      2021: [],
      2022: [],
      2023: [],
    };

    // Add an array to the priceObject, for each property. The key is that property's ID
    for (const property of properties) {
      priceObject[property.id] = [];
    }

    // Push the price data for each property into the correct array
    for (const price of prices) {
      priceObject[price.property_id].push(price);
    }

    // Loop through each property to get an integer for querying the priceObject object
    for (let property of properties) {
      // Another loop for getting the index of the array inside of each priceObject index (priceObject is an object full of arrays)
      for (let i = 1; i < priceObject[property.id].length; i++) {
        if (priceObject[property.id].length > 3) {
          allIncreasesPerYear[
            priceObject[property.id][i].date.substring(0, 4)
          ].push(
            Math.round(
              ((parseInt(priceObject[property.id][i].price) -
                parseInt(priceObject[property.id][i - 1].price)) /
                parseInt(priceObject[property.id][i - 1].price)) *
                100 *
                10
            ) / 10
          );
        }
      }
    }

    // Now we have an allIncreasesPerYear object, that contains an array with the percentage increase for each property, for each year
    // Loop through that data to get the average increase per year, and push that to our data array
    for (let i = 2015; i <= 2023; i++) {
      let sum = 0;
      for (const indexValue of allIncreasesPerYear[i]) {
        sum += indexValue;
      }
      averageIncreasePerYear[i] =
        Math.round((sum / allIncreasesPerYear[i].length) * 100) / 100;
    }

    return;
  };

  // Multiplies the initial price by the average rent increase percentage, to compare
  // what it would be like if this property followed the market trend exactly
  const showPricesBasedOnAverages = () => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].date === 2014) {
        data[i].compare_at_price = data[i].price;
      }
      if (data[i].date === 2015 && data[i - 1] !== undefined) {
        data[i].compare_at_price = Math.round(
          data[i - 1].compare_at_price +
            data[i - 1].compare_at_price * (averageIncreasePerYear[2015] / 100)
        );
      }
      if (data[i].date === 2016 && data[i - 1] !== undefined) {
        data[i].compare_at_price = Math.round(
          data[i - 1].compare_at_price +
            data[i - 1].compare_at_price * (averageIncreasePerYear[2016] / 100)
        );
      }
      if (data[i].date === 2017 && data[i - 1] !== undefined) {
        data[i].compare_at_price = Math.round(
          data[i - 1].compare_at_price +
            data[i - 1].compare_at_price * (averageIncreasePerYear[2017] / 100)
        );
      }
      if (data[i].date === 2018 && data[i - 1] !== undefined) {
        data[i].compare_at_price = Math.round(
          data[i - 1].compare_at_price +
            data[i - 1].compare_at_price * (averageIncreasePerYear[2018] / 100)
        );
      }
      if (data[i].date === 2019 && data[i - 1] !== undefined) {
        data[i].compare_at_price = Math.round(
          data[i - 1].compare_at_price +
            data[i - 1].compare_at_price * (averageIncreasePerYear[2019] / 100)
        );
      }
      if (data[i].date === 2020 && data[i - 1] !== undefined) {
        data[i].compare_at_price = Math.round(
          data[i - 1].compare_at_price +
            data[i - 1].compare_at_price * (averageIncreasePerYear[2020] / 100)
        );
      }
      if (data[i].date === 2021 && data[i - 1] !== undefined) {
        data[i].compare_at_price = Math.round(
          data[i - 1].compare_at_price +
            data[i - 1].compare_at_price * (averageIncreasePerYear[2021] / 100)
        );
      }
      if (data[i].date === 2022 && data[i - 1] !== undefined) {
        data[i].compare_at_price = Math.round(
          data[i - 1].compare_at_price +
            data[i - 1].compare_at_price * (averageIncreasePerYear[2022] / 100)
        );
      }
      if (data[i].date === 2023 && data[i - 1] !== undefined) {
        data[i].compare_at_price = Math.round(
          data[i - 1].compare_at_price +
            data[i - 1].compare_at_price * (averageIncreasePerYear[2023] / 100)
        );
      }
    }
  };

  getRentIncreaseAverages(prices, properties);
  showPricesBasedOnAverages();

  for (const dat of data) {
    if (isNaN(dat.compare_at_price) === true) {
    }
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && data[0].compare_at_price && payload.length > 1) {
      return (
        <div className="custom-tooltip">
          <p className="label tooltip-text">{`Year: ${label}`}</p>
          <p className="tooltip-text blue">{`Actual price: $${payload[0].value}`}</p>
          <p className="tooltip-text red">{`Market-adjusted price: $${payload[1].value}`}</p>
          {console.log("load", payload)}
        </div>
      );
    }
    return null;
  };

  return data.length < 3 ? (
    <div>Not enough data</div>
  ) : (
    <div>
      <div className="chart-title">
        Property price vs average market increase:
      </div>
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
          <Area dataKey="compare_at_price" stroke="red" fill="#DEDEDE" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" opacity={0.75} />
          <XAxis dataKey="date" />
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

export default RentIncreaseChart;
