import "./RentList.scss";
import React from "react";
import BackButton from "./BackButton";
import MultiRangeSlider from "./multiRangeSlider/MultiRangeSlider";
import BedFilter from "./filters/BedFilter";
import BathFilter from "./filters/BathFilter";
import ChartsPanel from "./ChartsPanel";
import { useContext } from "react";
import { MarkerFilterContext } from "../providers/MarkerFilterProvider";
import { DataBaseContext } from "../providers/DataBaseProvider";
import {
  getCostFromPrices,
  getPhotoFromPrices,
  getSizeFromPrices,
  getBedroomsFromPrices,
  getBathroomsFromPrices,
} from "./helpers/getDataFromPrices";

const RentList = () => {
  const { state } = useContext(MarkerFilterContext);
  const { prices } = useContext(DataBaseContext);

  

  return (
    <div className="RentList">
      <div className="slider-container">
        <BackButton />

        <MultiRangeSlider style={{ height: "20px" }} />

        <BedFilter />

        <BathFilter />
      </div>
      {state.currentProperty.id ? (
        <React.Fragment>
          <div className="img-container">
            <img
              src={
                prices
                  ? getPhotoFromPrices(state.currentProperty, prices)
                  : "https://imgur.com/QjyKoRq"
              }
              alt="Rent List"
              className="image"
            />
          </div>
          <div className="info">
            <div className="BubbleDetail_priceContainer__Zfrap">
              <div className="price">
                $
                {prices ? getCostFromPrices(state.currentProperty, prices) : ""}
              </div>
            </div>
          </div>
          <table className="home-right-property-table-top">
            <thead>
              <tr>
                <th>Address</th>
                <th>City</th>
                <th>Province</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{state.currentProperty.street_address}</td>
                <td>{state.currentProperty.city}</td>
                <td>{state.currentProperty.province}</td>
              </tr>
            </tbody>
          </table>
          <table className="home-right-property-table-bottom">
            <thead>
              <tr>
                <th>Bedrooms</th>
                <th>Bathrooms</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {prices
                    ? getBedroomsFromPrices(state.currentProperty, prices)
                    : ""}{" "}
                </td>
                <td>
                  {prices
                    ? getBathroomsFromPrices(state.currentProperty, prices)
                    : ""}{" "}
                </td>
                <td>
                  {prices
                    ? getSizeFromPrices(state.currentProperty, prices)
                    : ""}{" "}
                  ft&#178;
                </td>
              </tr>
            </tbody>
          </table>
        </React.Fragment>
      ) : (
        <>          
        </>
      )}
      <ChartsPanel />
    </div>
  );
};

export default RentList;
