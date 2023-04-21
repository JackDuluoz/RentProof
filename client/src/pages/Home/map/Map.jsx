import React, { useContext } from "react";
import { GoogleMap, MarkerClusterer, useLoadScript } from "@react-google-maps/api";
import { DataBaseContext } from "../../../providers/DataBaseProvider";
import { getBedroomsFromPrices, getBathroomsFromPrices, getCostFromPrices } from "../helpers/getDataFromPrices";
import Marker from "./Marker.jsx";
import "./Map.scss";

export default function MapDisplay(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const { properties, prices } =
    useContext(DataBaseContext);

  let markers = [];

  if (properties && prices) {
    const propertiesWithAtLeastOneApprovedPrice = (properties, prices) => {
      return properties
        .filter((property) => {
          return prices.some(
            (price) =>
              price.property_id === property.id &&
              price.admin_status === "approved"
          );
        })
        .reverse()
        .map((property) => {
          return property;
        });
    };

    const markerProperties = propertiesWithAtLeastOneApprovedPrice(
      properties,
      prices
    );

    markers = (
      <MarkerClusterer minimumClusterSize={6}>
        {(clusterer) =>
          markerProperties.map((property) => {
            return (
              <Marker
                key={property.id}
                id={property.id}
                position={{
                  lat: Number(property.latitude),
                  lng: Number(property.longitude),
                }}
                title={property.address}
                cost={getCostFromPrices(property, prices)}
                label={getCostFromPrices(property, prices)}
                bedrooms={getBedroomsFromPrices(property, prices)}
                bathrooms={getBathroomsFromPrices(property, prices)}
                properties={properties}
                prices={prices}
                clusterer={clusterer}
              />
            );
          })
        }
      </MarkerClusterer>
    );
  }

  function Map() {
    return (
      <GoogleMap
        zoom={13}
        center={{ lat: 49.28, lng: -123.12 }}
        mapContainerClassName="map-container"
      >
        {markers}
      </GoogleMap>
    );
  }

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}
