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

const AllPropertiesPercentChart = (props) => {
  const data = [];
  const {
    selectedBedrooms,
    selectedBathrooms
  } = useContext(MarkerFilterContext);

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

    // loop through selected bedrooms
    for (const bathrooms of selectedBathrooms) {
      // search prices chart for properties with that number of bedrooms
      for (const price of prices) {
        if (price.number_of_bathrooms === bathrooms) {
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

  if (selectedBathrooms.length && selectedBedrooms.length) {
    const updatedProperties = [];
    const updatedPrices = [];

    // loop through selected bedrooms and bathrooms
    for (const bathrooms of selectedBathrooms) {
      for (const bedrooms of selectedBedrooms) {
        // search prices chart for properties with that number of bedrooms
        for (const price of prices) {
          if (
            price.number_of_bathrooms === bathrooms &&
            price.number_of_bedrooms === bedrooms
          ) {
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
    }
    properties = updatedProperties;
    prices = updatedPrices;
  }

  const getRentIncreaseAverages = (prices, properties) => {
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

    // Compare all prices to that of the year previous, and send the calculated rent increase to an allIncreasesPerYear object
    for (let i = 1; i < prices.length; i++) {
      if (prices[i].date.substring(0, 4) > prices[i - 1].date.substring(0, 4)) {
        allIncreasesPerYear[prices[i].date.substring(0, 4)].push(
          Math.round(
            ((parseInt(prices[i].price) - parseInt(prices[i - 1].price)) /
              parseInt(prices[i - 1].price)) *
              100 *
              10
          ) / 10
        );
      }
    }

    for (let i = 2015; i <= 2023; i++) {
      let sum = 0;
      for (const indexValue of allIncreasesPerYear[i]) {
        sum += indexValue;
      }
      data.push({
        date: i,
        increase: Math.round((sum / allIncreasesPerYear[i].length) * 100) / 100,
      });
    }

    return;
  };

  getRentIncreaseAverages(prices, properties);

  // Adding allowable increase amounts to our data array, based on this source:
  // https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies/during-a-tenancy/rent-increases
  data[0].allowable_increase = 2.5;
  data[1].allowable_increase = 2.9;
  data[2].allowable_increase = 3.7;
  data[3].allowable_increase = 4.0;
  data[4].allowable_increase = 2.5;
  data[5].allowable_increase = 2.6;
  data[6].allowable_increase = 0.0;
  data[7].allowable_increase = 1.5;
  data[8].allowable_increase = 2.0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label tooltip-text">{`Year: ${label}`}</p>
          <p className="tooltip-text">{`Average increase: ${payload[0].value}%`}</p>
          <p className="tooltip-text">{`Allowable increase for existing leases: ${payload[1].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="chart-title">Average rent increase (year-over-year):</div>
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

          <Area dataKey="increase" stroke="#D0312D" fill="#DEDEDE" />
          <Area
            dataKey="allowable_increase"
            stroke="#5AB8F8"
            fill="url(#color)"
          />
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

export default AllPropertiesPercentChart;
