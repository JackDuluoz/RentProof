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
import { useContext } from "react";
import { MarkerFilterContext } from "../../../../providers/MarkerFilterProvider";
import { DataBaseContext } from "../../../../providers/DataBaseProvider";

const AveragePricePerSquareFoot = (props) => {
  const data = [];
  const { selectedBedrooms, selectedBathrooms } =
    useContext(MarkerFilterContext);

  let { prices, properties } = useContext(DataBaseContext);

  if (selectedBedrooms.length && !selectedBathrooms.length) {
    const updatedProperties = [];
    const updatedPrices = [];

    // loop through selected bedrooms
    for (const bedrooms of selectedBedrooms) {
      // search prices chart for properties with that number of bedrooms
      for (const price of prices) {
        if (price.number_of_bedrooms === bedrooms) {
          updatedPrices.push(price);

          // this is to ensure that the same property won't get pushed multiple times
          // (this returns "-1" if the property isn't already in our new array, which allows the next part to push that property)
          const index = updatedProperties.findIndex(
            (property) => property.id === price.property_id
          );
          if (index === -1) {
            updatedProperties.push(
              properties.filter(
                (property) => property.id === price.property_id
              )[0]
            );
          }
        }
      }
    }
    properties = updatedProperties;
    prices = updatedPrices;
  }

  if (selectedBathrooms.length && !selectedBedrooms.length) {
    const updatedProperties = [];
    const updatedPrices = [];

    // this code is explained in a comment above
    for (const bathrooms of selectedBathrooms) {
      for (const price of prices) {
        if (price.number_of_bathrooms === bathrooms) {
          updatedPrices.push(price);
          const index = updatedProperties.findIndex(
            (property) => property.id === price.property_id
          );
          if (index === -1) {
            updatedProperties.push(
              properties.filter(
                (property) => property.id === price.property_id
              )[0]
            );
          }
        }
      }
    }
    properties = updatedProperties;
    prices = updatedPrices;
  }

  if (selectedBathrooms.length && selectedBedrooms.length) {
    const updatedProperties = [];
    const updatedPrices = [];

    // this code is explained in a comment above
    for (const bathrooms of selectedBathrooms) {
      for (const bedrooms of selectedBedrooms) {
        for (const price of prices) {
          if (
            price.number_of_bathrooms === bathrooms &&
            price.number_of_bedrooms === bedrooms
          ) {
            updatedPrices.push(price);
            const index = updatedProperties.findIndex(
              (property) => property.id === price.property_id
            );
            if (index === -1) {
              updatedProperties.push(
                properties.filter(
                  (property) => property.id === price.property_id
                )[0]
              );
            }
          }
        }
      }
    }
    properties = updatedProperties;
    prices = updatedPrices;
  }

  const getAveragePricePerFoot = (prices) => {
    const allPricesPerYear = {
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

    // Compare all prices to that of the year previous, and send the calculated rent increase to an allIncreasesPerYear object
    for (let i = 1; i < prices.length; i++) {
      allPricesPerYear[prices[i].date.substring(0, 4)].push(prices[i]);
    }

    for (let i = 2014; i <= 2023; i++) {
      let priceSum = 0;
      let squareFootSum = 0;
      for (const indexValue of allPricesPerYear[i]) {
        priceSum += parseInt(indexValue.price);
        squareFootSum += indexValue.square_footage;
      }

      const averagePricePerFoot =
        Math.round((priceSum / squareFootSum) * 100) / 100;

      data.push({
        date: i,
        Price: averagePricePerFoot,
      });
    }

    return;
  };

  getAveragePricePerFoot(prices);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label tooltip-text">{`Year: ${label}`}</p>
          <p className="tooltip-text">{`Price per square foot (monthly): $${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="chart-title">Average price per square foot:</div>
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

          <Area dataKey="Price" stroke="#5AB8F8" fill="url(#color)" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" opacity={0.75} />
          <XAxis dataKey="date" />
          <YAxis
            dataKey="Price"
            domain={[1, 4]}
            tickCount={7}
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

export default AveragePricePerSquareFoot;
