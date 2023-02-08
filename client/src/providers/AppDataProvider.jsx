import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [selectedBedrooms, setSelectedBedrooms] = useState([0, 1, 2, 3, 4]);
  const [selectedBathrooms, setSelectedBathrooms] = useState([1, 2, 3]);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(100);
  const [state, setState] = useState({
    markers: {},
    bedrooms: [],
    bathrooms: [],
    minVal,
    maxVal,
    users: null,
    properties: null,
    prices: null,
  });

  useEffect(() => {
    const usersURL = `http://localhost:8001/users`;
    const propertiesURL = `http://localhost:8001/properties`;
    const pricesURL = `http://localhost:8001/prices`;
    Promise.all([
      axios.get(usersURL),
      axios.get(propertiesURL),
      axios.get(pricesURL),
    ]).then((all) => {
      let dbUsers = all[0].data;
      let dbProperties = all[1].data;
      let dbPrices = all[2].data;
      setState((prev) => ({
        ...prev,
        users: dbUsers,
        properties: dbProperties,
        prices: dbPrices,
      }));
    });
  }, [setState]);

  const handleClickBeds = (index) => {
    if (selectedBedrooms.includes(index)) {
      setSelectedBedrooms(selectedBedrooms.filter((i) => i !== index));
    } else {
      setSelectedBedrooms([...selectedBedrooms, index]);
    }
  };
  const handleClickBaths = (index) => {
    if (selectedBathrooms.includes(index)) {
      setSelectedBathrooms(selectedBathrooms.filter((i) => i !== index));
    } else {
      setSelectedBathrooms([...selectedBathrooms, index]);
    }
  };

  useEffect(() => {
    setState((prevState) => ({ ...prevState, bedrooms: selectedBedrooms }));
  }, [selectedBedrooms]);
  useEffect(() => {
    setState((prevState) => ({ ...prevState, bathrooms: selectedBathrooms }));
  }, [selectedBathrooms]);
  return (
    <AppDataContext.Provider
      value={{
        state,
        handleClickBeds,
        handleClickBaths,
        setMinVal,
        setMaxVal,
        selectedBathrooms,
        selectedBedrooms,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
