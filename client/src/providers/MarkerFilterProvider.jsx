import React, { createContext, useState, useEffect, useContext } from "react";
import { DataBaseContext } from "../providers/DataBaseProvider";
export const MarkerFilterContext = createContext();

export const MarkerFilterProvider = ({ children }) => {
  const { properties } = useContext(DataBaseContext);
  const [selectedBedrooms, setSelectedBedrooms] = useState([]);
  const [selectedBathrooms, setSelectedBathrooms] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState({});
  const [minF, setMinF] = useState(1);
  const [maxF, setMaxF] = useState(5000);
  const [state, setState] = useState({
    markers: {},
    bedrooms: [],
    bathrooms: [],
    currentProperty: {},
    prevProperty: [],
  });

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

  const getPropertyById = (id) => {
  return properties
    .filter(property => property.id === id)
  }

  const handleClickMarker = (id) => {
    const newProperty = getPropertyById(id)[0]
    // console.log("Selected Property", newProperty)
    setSelectedProperty(newProperty)
  };


useEffect(() => {
  setState((prevState) => {
    if (!state.currentProperty.id) {
      return prevState;
    }

    return {
      ...prevState,
      prevProperty: [...prevState.prevProperty, state.currentProperty.id],
    };
  });

  setState((prevState) => ({
    ...prevState,
    currentProperty: selectedProperty,
  }));
}, [selectedProperty, state.currentProperty.id]);


  useEffect(() => {
    setState((prevState) => ({ ...prevState, bedrooms: selectedBedrooms }));
  }, [selectedBedrooms]);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, bathrooms: selectedBathrooms }));
  }, [selectedBathrooms]);

  return (
    <MarkerFilterContext.Provider
      value={{
        state,
        setState,
        handleClickBeds,
        handleClickBaths,
        handleClickMarker,
        setMinF,
        setMaxF,
        minF,
        maxF,
        selectedBathrooms,
        selectedBedrooms,
        setSelectedProperty,
      }}
    >
      {children}
    </MarkerFilterContext.Provider>
  );
};
