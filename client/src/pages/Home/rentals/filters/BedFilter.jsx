import React, { useContext } from "react";
import { MarkerFilterContext } from "../../../../providers/MarkerFilterProvider";

export default function BedFilter() {
  // Destructure `state` and `handleClick` from the AppDataContext
  const { state, handleClickBeds } = useContext(MarkerFilterContext);

  // An array of bedroom numbers to be displayed as filters
  const bedrooms = [0, 1, 2, 3, 4];
  return (
    <div className="filter-container">
      <div className="filter-row">
        <div className="filter-right">
          <div className="filter-label">Bedrooms</div>
          <div className="filter-wrap">
            <div className="filter">
              <div className="row filter-bedrooms">
                {/* Map through the `bedrooms` array and display buttons for each number */}
                {bedrooms.map((bedrooms) => (
                  <button
                    key={bedrooms}
                    className={`filter-button ${
                      state.bedrooms.includes(bedrooms) ? "selected" : ""
                    }`}
                    onClick={() => handleClickBeds(bedrooms)}
                  >
                    {bedrooms === 0 ? "Studio" : bedrooms}
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
