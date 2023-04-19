import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";
import "./Slider.scss";
import { MarkerFilterContext } from "../../../../providers/MarkerFilterProvider";


const Slider = () => {
  const min = 0;
  const max = 10000;
  const { setMinF, setMaxF } = useContext(MarkerFilterContext);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );
  const [minVal, setMinVal] = useState(1);
  const [maxVal, setMaxVal] = useState(5000);

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);



  return (
    <div className="container">
      <div className="slider__left-value">${minVal /* update this first*/}</div>
      <input
        type="range"
        step="100"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinF(value);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        step="100"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxF(value);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
      </div>
      <div className="slider__right-value">
        ${maxVal /* update this first*/}
      </div>
    </div>
  );
};

export default Slider;
