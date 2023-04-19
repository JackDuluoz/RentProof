import React, { useContext, useState } from "react";
import { DataBaseContext } from "../../providers/DataBaseProvider";
import axios from "axios";
import './AddProperty.scss'

const AddProperty = () => {

  const { setProperties } = useContext(DataBaseContext);

  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('Awaiting Submission ...');

  const handleSubmit = (event) => {
    event.preventDefault();

    const addressForUrl = `${address}, ${city}`
    const propertyURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressForUrl}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}` 

    axios.get(propertyURL)
      .then((response) => {
        const latitude = response.data.results[0].geometry.location.lat 
        const longitude = response.data.results[0].geometry.location.lng 
        const property = {
          'province': province,
          'city': city,
          'street_address': address,
          'latitude': latitude,
          'longitude': longitude
        }
        axios.post('http://localhost:8001/properties', property)
          .then((response) => {
            setMessage(`Property ${response.data.id} Added`)
            const propertyWithId = {
              'id': response.data.id,
              'province': province,
              'city': city,
              'street_address': address,
              'latitude': latitude,
              'longitude': longitude
            }
            setProperties(prev => [...prev, propertyWithId])
          })
          .catch((error) => {
            console.log('Axios Post Error', error);
          });
      })
      .catch((error) => {
        console.log("Error Finding Property:", error);
        setMessage('Property Not Found')
      });
    setProvince('')
    setCity('')
    setAddress('')
    setTimeout(() => {
      setMessage('Awaiting Submission ...')
    }, 1500);
  }

  return (
     <div className="wrapper-property">
      <div className="title">
        Add Your Property
      </div>
      <div className="form">
        <div className="inputfield">
          <label>Province</label>
          <div className="custom_select">
            <select
              value={province}
              onChange={(event) => setProvince(event.target.value)}
            >
              <option value="">Select</option>  
              <option value="AB">Alberta</option>
              <option value="BC">British Columbia</option>
              <option value="MB">Manitoba</option>
              <option value="NB">New Brunswick</option>
              <option value="NL">Newfoundland and Labrador</option>
              <option value="NS">Nova Scotia</option>
              <option value="NT">Northwest Territories</option>
              <option value="NU">Nunavut</option>
              <option value="ON">Ontario</option>
              <option value="PE">Prince Edward Island</option>
              <option value="QC">Quebec</option>
              <option value="SK">Saskatchewan</option>
              <option value="YT">Yukon</option>
            </select>
          </div>
        </div>
        <div className="inputfield">
          <label>City</label>
          <input
            type="text"
            className="input"
            required
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
        <div className="inputfield">
          <label>Street Address</label>
          <input
            type="text"
            className="input"
            required
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div className="inputfield">
          <input type="submit" value="Add Property" className="btn" onClick={handleSubmit} />
        </div>
      </div>
      <div>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default AddProperty;