import React, { useState } from "react";
import API from './API/API.js';

export default function EditListingPopup({ data, onClose, getTableData }) {
  const [listingID, setListingID] = React.useState(data["_id"]);
  const [listingName, setListingName] = React.useState(data["name"]);
  const [listingSummary, setListingSummary] = React.useState(data["summary"]);
  const [listingBedroom, setListingBedroom] = React.useState(data["bedrooms"]);
  const [listingBathroom, setListingBathroom] = React.useState(data["bathrooms"]);
    
  const handleNameEdit = (event) => {
    setListingName(event.target.value);
  };

  const handleSummaryEdit = (event) => {
    setListingSummary(event.target.value);
  };

  const handleBedroomEdit = (event) => {
    setListingBedroom(event.target.value);
  };

  const handleBathroomEdit = (event) => {
    setListingBathroom(event.target.value);
  };

  const editListing = async () => {
    try {
      let jsonData = {
        name: `${listingName}`,
        summary: `${listingSummary}`,
        bedrooms: `${listingBedroom}`,
        bathrooms: `${listingBathroom}`
      }
      const api = new API();
      const update = await api.edit(listingID, jsonData);
      
      if(update === true) {
        getTableData();
        onClose();
      }

    } catch (error) {
      console.error('Error in editing listing', error);
    }
  };

  const handleUpdate = () => {
    editListing();
  };

  return (
    <div className='popup' data-testid="editPopup">
        <div className='popup-content'>
          <div className='model-header'>
            <h2 className='model-title'>Edit Listing {listingName}</h2>
          </div>
          <div className='model-body'>
            
              <p>Enter Listing Name <input
                type="text"
                className="textbox"
                value={listingName}
                onChange={handleNameEdit}
                placeholder={listingName}
              /></p>
              <p>Enter Listing Summary <textarea
                rows="5" // Number of visible rows
                cols="40" // Number of visible columns
                value={listingSummary}
                onChange={handleSummaryEdit}
                placeholder={data["summary"]}
                className="textbox"
              ></textarea></p>
              <p>Enter Listing Bedrooms <input
                type="text"
                className="textbox"
                value={listingBedroom}
                onChange={handleBedroomEdit}
                placeholder={data["bedrooms"]}
              /></p>
              <p>Enter Listing Bathrooms <input
                type="text"
                className="textbox"
                value={listingBathroom}
                onChange={handleBathroomEdit}
                placeholder={data["bathrooms"]}
              /></p>
            <div className='model-footer'>
              <button className="button" onClick={handleUpdate}>Update</button>
              <button className="button" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
    </div>
  );
  
}