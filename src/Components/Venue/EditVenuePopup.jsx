import React, { useState } from "react";
import API from '../App/API/API.js';
import TextField from '../App/UIComponents/textField.jsx'

export default function EditVenuePopup({ data, onClose, getTableData }) {
  const [venueID, setVenueID] = useState(data.hasOwnProperty("_id") ? data._id : "");
  const [venueName, setVenueName] = useState(data.hasOwnProperty("name") ? data.name : "");
  const [venueSummary, setVenueSummary] = useState(data.hasOwnProperty("summary") ? data.summary : "");
  const [venueType, setVenueType] = useState(data.hasOwnProperty("type") ? data.type : "");
  const [venueAddress1, setVenueAddress1] = useState(data.hasOwnProperty("address1") ? data.address1 : "");
  const [venueAddress2, setVenueAddress2] = useState(data.hasOwnProperty("address2") ? data.address2 : "");
  const [venueCity, setVenueCity] = useState(data.hasOwnProperty("city") ? data.city : "");
  const [venueState, setVenueState] = useState(data.hasOwnProperty("state") ? data.state : "");

  const [validateName, setValidateName] = useState(false);
    
  const handleNameEdit = (event) => {
    setVenueName(event.target.value);
    setValidateName(false);
  };

  const handleSummaryEdit = (event) => {
    setVenueSummary(event.target.value);
  };

  const handleTypeEdit = (event) => {
    setVenueType(event.target.value);
  };

  const handleAddress1Edit = (event) => {
    setVenueAddress1(event.target.value);
  };

  const handleAddress2Edit = (event) => {
    setVenueAddress2(event.target.value);
  };

  const handleCityEdit = (event) => {
    setVenueCity(event.target.value);
  };

  const handleStateEdit = (event) => {
    setVenueState(event.target.value);
  };

  const handleOnClose = () => {
    setValidateName(false);
    onClose();
  };

  const handleEditVenue = () => {
    let noErrors = true
    
    if(validate(venueName)) {
      setValidateName(true);
      noErrors = false;
    }
    
    if(noErrors) {
      editVenue();
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

  const editVenue = async () => {
    try {
      let jsonData = {
        name: `${venueName}`,
        summary: `${venueSummary}`,
        type: `${venueType}`,
        address1: `${venueAddress1}`,
        address2: `${venueAddress2}`,
        city: `${venueCity}`,
        state: `${venueState}`
      }
      const api = new API(process.env.REACT_APP_API_URL);
      const update = await api.edit(venueID, jsonData);
      
      if(update === true) {
        getTableData();
        handleOnClose();
      }

    } catch (error) {
      console.error('Error in editing venue', error);
    }
  };

  return (
    <div className='popup' data-testid="editPopup">
        <div className='popup-content'>
          <div className='model-header'>
            <h2 className='model-title'>Edit venue {venueName}</h2>
          </div>
          <div className='model-body'>
            <div>
              <span>Venue ID: </span>
              <span id="venueidtxt">{venueID}</span>
            </div>
            <TextField title="Enter Venue Name"
              placeHolder={venueName}
              name="venueName"
              inputValue={venueName}
              handleInputChange={handleNameEdit} 
              validate={validateName}
              error="Name can't be empty" />
              
            <TextField title="Enter Venue Summary"
              placeHolder={venueSummary}
              name="venueSummary"
              inputValue={venueSummary}
              handleInputChange={handleSummaryEdit} 
              validate={false}
              error="" />
            
            <TextField title="Enter Venue Type"
              placeHolder={venueType}
              name="venueType"
              inputValue={venueType}
              handleInputChange={handleTypeEdit} 
              validate={false}
              error="" />

            <TextField title="Enter Venue Address"
              placeHolder={venueAddress1}
              name="venueAddress1"
              inputValue={venueAddress1}
              handleInputChange={handleAddress1Edit} 
              validate={false}
              error="" />
            
            <TextField title="Enter Venue Address"
              placeHolder={venueAddress2}
              name="venueAddress2"
              inputValue={venueAddress2}
              handleInputChange={handleAddress2Edit} 
              validate={false}
              error="" />

            <TextField title="Enter Venue City"
              placeHolder={venueCity}
              name="venueCity"
              inputValue={venueCity}
              handleInputChange={handleCityEdit} 
              validate={false}
              error="" />

            <TextField title="Enter Venue State"
              placeHolder={venueState}
              name="venueState"
              inputValue={venueState}
              handleInputChange={handleStateEdit} 
              validate={false}
              error="" />

            <div className='model-footer'>
              <button className="button" onClick={handleEditVenue} id="update" data-testid="updateBtn">Update</button>
              <button className="button" onClick={handleOnClose} id="close" data-testid="closeBtn">Close</button>
            </div>
          </div>
        </div>
    </div>
  );
  
}