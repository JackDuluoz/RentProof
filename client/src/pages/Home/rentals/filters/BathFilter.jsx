import React, { useContext } from "react";
import "./BathFilter.scss";
import { MarkerFilterContext } from "../../../../providers/MarkerFilterProvider";

export default function BathFilter() {
  // Destructure `state` and `handleClick` from the AppDataContext
  const { state, handleClickBaths } = useContext(MarkerFilterContext);

  // An array of bathroom numbers to be displayed as filters
  const bathrooms = [1, 2, 3];

  return (
    <div className="filter-container">
      <div className="filter-row">
        <div className="filter-right">
          <div className="filter-label">Bathrooms</div>
          <div className="filter-wrap">
            <div className="filter">
              <div className="row filter-bathrooms">
                {/* Map through the `bathrooms` array and display buttons for each number */}
                {bathrooms.map((bathroom) => (
                  <button
                    key={bathroom}
                    className={`filter-button ${
                      state.bathrooms.includes(bathroom) ? "selected" : ""
                    }`}
                    onClick={() => handleClickBaths(bathroom)}
                  >
                    {bathroom === 3 ? `${bathroom}+` : bathroom}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
