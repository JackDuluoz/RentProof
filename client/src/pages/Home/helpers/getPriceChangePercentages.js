import { getPriceHistory } from "./getDataFromPrices";

export const getPriceChangePercentage = (
  currentProperty_id,
  prices,
  properties
) => {
  const data = [];
  const currentPropertyPrices = getPriceHistory(currentProperty_id, prices);
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

  const addPricesToData = () => {
    for (let price of currentPropertyPrices) {
      if (price.admin_status === "approved") {
        data.push({
          date: parseInt(price.date.substring(0, 4)),
          price: parseInt(price.price),
        });
      }
    }
    getRentIncreaseAverages(prices, properties, data);
  };

  const getRentIncreaseAverages = (prices, properties, data) => {
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

    // now we have an allIncreasesPerYear object, that contains an array with the percentage increase for each property, for each year
    // Loop through that data to get the average increase per year, and push that to our data array
    for (let i = 2015; i <= 2023; i++) {
      let sum = 0;
      for (const indexValue of allIncreasesPerYear[i]) {
        sum += indexValue;
      }
      averageIncreasePerYear[i] =
        Math.round((sum / allIncreasesPerYear[i].length) * 100) / 100;
    }
    showPricesBasedOnAverages();
  };

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
    percentIncreaseVsMarketAverage();
  };

  const percentIncreaseVsMarketAverage = () => {
    for (const d of data) {
      d.price_difference_percentage =
        Math.round((d.price / d.compare_at_price - 1) * 100 * 10) / 10;
    }
  };

  // Call function to populate the data
  addPricesToData();

  if (isNaN(data[data.length - 1].price_difference_percentage)) {
    data[data.length - 1].price_difference_percentage = 0;
  }

  return data[data.length - 1].price_difference_percentage;
};
