import { useState, useEffect, useContext } from "react";

export const useAppData = () => {
  const [selectedButtons, setSelectedButtons] = useState([2, 3]);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(100);
  const [state, setState] = useState({
    markers: {},
    bedrooms: [],
    minVal,
    maxVal,
  });

  const handleClick = (index) => {
    if (selectedButtons.includes(index)) {
      setSelectedButtons(selectedButtons.filter((i) => i !== index));
    } else {
      setSelectedButtons([...selectedButtons, index]);
    }
  };

  useEffect(() => {
    setState((prevState) => ({ ...prevState, bedrooms: selectedButtons }));
  }, [selectedButtons]);

  return { state, handleClick, setMinVal, setMaxVal };
};
