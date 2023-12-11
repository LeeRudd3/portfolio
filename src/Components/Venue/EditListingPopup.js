import React, { useState } from "react";
import API from '../App/API/API.js';
import TextField from '../App/UIComponents/textField.jsx'

export default function EditListingPopup({ data, onClose, getTableData }) {
  const [listingID, setListingID] = React.useState(data["_id"]);
  const [listingName, setListingName] = React.useState(data["name"]);
  const [listingSummary, setListingSummary] = React.useState(data["summary"]);
  const [listingBedroom, setListingBedroom] = React.useState(data["bedrooms"]);
  const [listingBathroom, setListingBathroom] = React.useState(data["bathrooms"]);
  const [validateName, setValidateName] = React.useState(false);
  const [validateBedroom, setValidateBedroom] = React.useState(false);
  const [validateBathroom, setValidateBathroom] = React.useState(false);
    
  const handleNameEdit = (event) => {
    setListingName(event.target.value);
    setValidateName(false);
  };

  const handleSummaryEdit = (event) => {
    setListingSummary(event.target.value);
  };

  const handleBedroomEdit = (event) => {
    setListingBedroom(event.target.value);
    setValidateBedroom(false);
  };

  const handleBathroomEdit = (event) => {
    setListingBathroom(event.target.value);
    setValidateBathroom(false);
  };

  const handleOnClose = () => {
    setValidateName(false);
    setValidateBedroom(false);
    setValidateBathroom(false);
    onClose();
  };

  const handleEditListing = () => {
    let noErrors = true
    
    if(validate(listingName)) {
      setValidateName(true);
      noErrors = false;
    }
    if(!isFloat(`${listingBedroom}`)) {
      setValidateBedroom(true);
      noErrors = false;
    }

    if(!isFloat(`${listingBathroom}`)) {
      setValidateBathroom(true);
      noErrors = false;
    }
    
    if(noErrors) {
      editListing();
      // Close the pop-up
      onClose();
    }
  };

  const validate = (str) => {
    return str.trim() === '';
  }

  const isFloat = (str) => {
    if(str === '') {
      return true;
    }
    else {
      // Regular expression to match a floating-point number
      const floatRegex = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;
      
      return floatRegex.test(str);
    }
  }

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
        handleOnClose();
      }

    } catch (error) {
      console.error('Error in editing listing', error);
    }
  };

  return (
    <div className='popup' data-testid="editPopup">
        <div className='popup-content'>
          <div className='model-header'>
            <h2 className='model-title'>Edit Listing {listingName}</h2>
          </div>
          <div className='model-body'>
            <div>
              <span>Listing ID: </span>
              <span id="listingidtxt">{listingID}</span>
            </div>
            <TextField title="Enter Listing Name"
              placeHolder={listingName}
              name="listingName"
              inputValue={listingName}
              handleInputChange={handleNameEdit} 
              validate={validateName}
              error="Name can't be empty" />
              
            <TextField title="Enter Listing Summary"
              placeHolder={listingSummary}
              name="listingSummary"
              inputValue={listingSummary}
              handleInputChange={handleSummaryEdit} 
              validate={false}
              error="" />
            
            <TextField title="Enter Listing Bedrooms"
              placeHolder={listingBedroom}
              name="listingBedroom"
              inputValue={listingBedroom}
              handleInputChange={handleBedroomEdit} 
              validate={validateBedroom}
              error="Bedrooms must be a number" />

            <TextField title="Enter Listing Bathrooms"
              placeHolder={listingBathroom}
              name="listingBathroom"
              inputValue={listingBathroom}
              handleInputChange={handleBathroomEdit} 
              validate={validateBathroom}
              error="Bathrooms must be a number" />

            <div className='model-footer'>
              <button className="button" onClick={handleEditListing} id="update">Update</button>
              <button className="button" onClick={handleOnClose} id="close">Close</button>
            </div>
          </div>
        </div>
    </div>
  );
  
}