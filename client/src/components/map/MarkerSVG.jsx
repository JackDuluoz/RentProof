import React, { useState, useContext, lazy, Suspense } from "react";
import { getPriceChangePercentage } from "../helpers/getPriceChangePercentages";
import { MarkerFilterContext } from "../../providers/MarkerFilterProvider";

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

  function percentageToHexColor(percentage, lightness = 0, saturation = 100) {
    let R, G, B;
    percentage -= 60;

    R = Math.round(percentage * 2 + lightness + (100 - saturation));
    G = Math.round(150 + lightness - percentage * 2.5 + (100 - saturation));
    B =
      150 + lightness - percentage * 2.5 >= 255
        ? (150 + lightness - percentage * 2.5 - 255) * 4
        : 0 + (100 - saturation);

    R = R > 255 ? 255 : R < 0 ? 0 : R;
    G = G > 255 ? 255 : G < 0 ? 0 : G;
    B = B > 255 ? 255 : B < 0 ? 0 : B;

    R = R.toString(16).padStart(2, "0");
    G = G.toString(16).padStart(2, "0");
    B = B.toString(16).padStart(2, "0");

    return "#" + R + G + B;
  }

  function desaturate(hex, amount) {
    // Remove the '#' from the beginning of the hex string
    hex = hex.substring(1);

    // Convert hex string to RGB values
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Desaturate the color by averaging the RGB values and scaling them down
    let avg = (r + g + b) / 3;
    r = Math.round(avg + (r - avg) * (1 - amount));
    g = Math.round(avg + (g - avg) * (1 - amount));
    b = Math.round(avg + (b - avg) * (1 - amount));

    // Convert the RGB values back to a hex string
    let result = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return "#" + result;
  }

  function darken(hex, amount) {
    // Remove the '#' from the beginning of the hex string
    hex = hex.substring(1);

    // Convert hex string to RGB values
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Darken the color by decreasing the RGB values
    r = Math.round(r * (1 - amount));
    g = Math.round(g * (1 - amount));
    b = Math.round(b * (1 - amount));

    // Convert the RGB values back to a hex string
    let result = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return "#" + result;
  }
  
  const costVSavg = (getPriceChangePercentage(id, prices, properties)*4)+100;


  const isGray =
    state.prevProperty.includes(id) && state.currentProperty.id !== id;
  const saturation = state.prevProperty.includes(id) ? 0 : 100;
  const markerColor = percentageToHexColor(costVSavg, 120);
  const markerColorgreyed = desaturate(markerColor, 0.5);
  const markerColorgreyeddark = darken(desaturate(markerColor, 0.5), 0.3);
  const markerColorDarker = darken(markerColor, 0.7);
  const markerColorDark = darken(markerColor, 0.4);
  const Point = window.google.maps.Point;
  const Circle = window.google.maps.SymbolPath.CIRCLE;

  const pinSymbol2 = function (color, greycolor, darkColor, isGray, isHovered) {
    return {
      path: Circle,
      fillColor: isGray ? greycolor : color,
      strokeColor: isGray ? "#808080" : darkColor,
      strokeWeight: isHovered ? 0.5 : 0.5,
      fillOpacity: 1,
      scale: isHovered ? 5.2 : 4,
      anchor: new Point(0.2, 4.8),
    };
  };

  function pinSymbol1(color, greycolor, darkColor, isGray, isHovered) {
    return {
      path: "M23.667 11.84c0 7.52-10.048 19.52-11.5 19.52s-11.5-12-11.5-19.52C.667 5.743 5.816.8 12.167.8c6.35 0 11.5 4.943 11.5 11.04",
      fillColor: isGray ? greycolor : color,
      fillOpacity: 1,
      strokeColor: isGray ? "#808080" : darkColor,
      strokeWeight: isHovered ? 3 : 1,
      scale: isHovered ? 1.3 : 1,
      anchor: new Point(13, 32),
    };
  }

  return (
    <div>
      {(selectedBedrooms.includes(bedrooms) || !selectedBedrooms.length) &&
      (selectedBathrooms.includes(bathrooms) || !selectedBathrooms.length) &&
      cost < maxF &&
      cost > minF ? (
        <Suspense fallback={<div>Loading...</div>}>
          {/* Marker 1 */}
          <GoogleMapMarker
            position={position}
            title={title}
            zIndex={isGray ? 0 : 1}
            onClick={() => handleClickMarker(id)}
            icon={pinSymbol1(
              markerColor,
              markerColorgreyed,
              markerColorDarker,
              isGray,
              isHovered
            )}
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
          Marker 2
          <GoogleMapMarker
            position={position}
            title={title}
            zIndex={isGray ? 0 : 1}
            onClick={() => handleClickMarker(id)}
            icon={pinSymbol2(
              markerColorDarker,
              markerColorgreyeddark,
              markerColorDark,
              isGray,
              isHovered
            )}
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
