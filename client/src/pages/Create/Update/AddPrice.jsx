import React, { useState, useContext } from "react";
import { DataBaseContext } from "../../../providers/DataBaseProvider";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { PropertyIdContext } from "../../../providers/PropertyIdProvider";
import "./AddPrice.scss";
import PhotoUpload from "./PhotoUpload";
import PhotoList from "./PhotoList";
import DocumentUpload from "./DocumentUpload";
import DocumentList from "./DocumentList";

const AddPrice = () => {

  const { setPrices } = useContext(DataBaseContext);

  const { updateId } = useContext(PropertyIdContext);

  const [id, setId] = useState(updateId);
  const [cost, setCost] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");

  const [photo, setPhoto] = useState("");
  const [document, setDocument] = useState("");

  const [photoFiles, setPhotoFiles] = useState([])
  const [documentFiles, setDocumentFiles] = useState([])

  const removePhoto = (filename) => {
    setPhotoFiles(photoFiles.filter(file => file.name !== filename))
  }

  const removeDocument = (filename) => {
    setDocumentFiles(documentFiles.filter(file => file.name !== filename))
  }

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = ReactSession.get("id");
    
    const price = {
      property: id,
      user: user,
      price: cost,
      document: `http://localhost:8001/files/documents/${document}`,
      photo: `http://localhost:8001/files/photos/${photo}`,
      property_type: type,
      square_footage: size,
      number_of_bedrooms: bedrooms,
      number_of_bathrooms: bathrooms,
    };

    axios
      .post("http://localhost:8001/prices", price)
      .then((response) => {
        setPrices(prev => [...prev, response.data])
        history.push('/')
      })
      .catch((error) => {
        console.log(error);
      });
    setId("");
    setCost("");
    setType("");
    setSize("");
    setBedrooms("");
    setBathrooms("");
    setPhoto("");
    setDocument("");
  };

  return (
    <div className="wrapper-price">
      <div className="title">Update Your Price</div>
      <div className="form">
        <div className="price-data">
          <div className="price-data-primary">
            <div className="inputfield">
              <label>Property Id</label>
              <input
                type="text"
                className="input"
                value={id}
                onChange={(event) => setId(event.target.value)}
              />
            </div>
            <div className="inputfield">
              <label>Price</label>
              <input
                type="text"
                className="input"
                value={cost}
                onChange={(event) => setCost(event.target.value)}
              />
            </div>
            <div className="inputfield">
              <label>Property Type</label>
              <input
                type="text"
                className="input"
                required
                value={type}
                onChange={(event) => setType(event.target.value)}
              />
            </div>
            <div className="inputfield">
              <label>Photo</label>
              <input
                type="text"
                className="input"
                required
                value={photo}
                readOnly
              />
            </div>
          </div>
          <div className="price-data-secondary">
            <div className="inputfield">
              <label>Square Footage</label>
              <input
                type="number"
                className="input"
                min={0}
                required
                value={size}
                onChange={(event) => setSize(event.target.value)}
              />
            </div>
            <div className="inputfield">
              <label>Bedrooms</label>
              <input
                type="number"
                className="input"
                min={0}
                required
                value={bedrooms}
                onChange={(event) => setBedrooms(event.target.value)}
              />
            </div>
            <div className="inputfield">
              <label>Bathrooms</label>
              <input
                type="number"
                className="input"
                min={0}
                required
                value={bathrooms}
                onChange={(event) => setBathrooms(event.target.value)}
              />
            </div>
            <div className="inputfield">
              <label>Document</label>
              <input
                type="text"
                className="input"
                required
                value={document}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="inputfield">
          <input
            type="submit"
            value="Submit Price"
            className="btn"
            onClick={handleSubmit}
          />
        </div>
        <div className='upload-row' >
          <div>
            <PhotoUpload files={photoFiles} setFiles={setPhotoFiles}
              removeFile={removePhoto} setPhoto={setPhoto} />
            <PhotoList files={photoFiles} removeFile={removePhoto} setPhoto={setPhoto} />
          </div>
          <div>
            <DocumentUpload files={documentFiles} setFiles={setDocumentFiles}
              removeFile={removeDocument} setDocument={setDocument} />
            <DocumentList files={documentFiles} removeFile={removeDocument} setDocument={setDocument} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPrice;
