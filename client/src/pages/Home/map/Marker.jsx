import React, { useState, useContext, lazy, Suspense } from "react";
import { MarkerFilterContext } from "../../../providers/MarkerFilterProvider";
import { getPriceChangePercentage } from "../helpers/getPriceChangePercentages";

const GoogleMapMarker = lazy(() =>
  import("@react-google-maps/api").then((module) => ({
    default: module.Marker,
  }))
);

<script src="https://maps.googleapis.com/maps/api/js?key=REACT_APP_GOOGLE_MAPS_API_KEY"></script>;


function Marker({
  bedrooms,
  bathrooms,
  cost,
  position,
  title,
  label,
  id,
  prices,
  properties,
  clusterer
}) {
  const [isHovered, setIsHovered] = useState(false);
  const {
    selectedBedrooms,
    selectedBathrooms,
    handleClickMarker,
    minF,
    maxF,
    state,
  } = useContext(MarkerFilterContext);


  
  let costVSavg = getPriceChangePercentage(id, prices, properties);
  if (costVSavg <= -20) {costVSavg = -20}
  costVSavg = Math.floor((costVSavg + 20) / 2.4);
  if (costVSavg>=14){costVSavg=14}

  const isGray =
    state.prevProperty.includes(id) && state.currentProperty.id !== id;
  return (
    <div>
      {(selectedBedrooms.includes(bedrooms) || !selectedBedrooms.length) &&
      (selectedBathrooms.includes(bathrooms) || !selectedBathrooms.length) &&
      cost < maxF &&
      cost > minF ? (
        <Suspense fallback={<div>Loading...</div>}>
          <GoogleMapMarker
            position={position}
            clusterer={clusterer}
            title={title}
            zIndex={isGray ? 0 : 1}
            onClick={() => handleClickMarker(id)}
            icon={{
              url: require(`../../../assets/GoogleSheetsTheme/marker${
                // edit GoogleSheetsTheme to another theme
                isGray ? "grey" : ""
              }${costVSavg}.png`),
              scaledSize: isHovered
                ? { width: 34, height: 47 }
                : { width: 26, height: 36 },
            }}
            onMouseOver={() => {
              setIsHovered(true);
            }}
            onMouseOut={() => {
              setIsHovered(false);
            }}
            animation={(() => {
              if (state.currentProperty.id === id) {
                return 1;
              }
              if (state.prevProperty.includes(id)) {
                return null;
              }
              return 2;
            })()}
          />
        </Suspense>
      ) : null}
    </div>
  );
}

export default React.memo(Marker);
