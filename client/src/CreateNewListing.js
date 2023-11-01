import React, { Component } from 'react';
import API from './API/API.js';
import TextField from './Components/TextField.js'

export default function CreateNewListing({ onClose, showCreateListing, updateTableData }) {
  const api = new API();
  const [inputNameValue, setInputNameValue] = React.useState('');
  const [inputSummaryValue, setInputSummaryValue] = React.useState('');
  const [inputBedroomValue, setInputBedroomValue] = React.useState('');
  const [inputBathroomValue, setInputBathroomValue] = React.useState('');
  const [validateName, setValidateName] = React.useState(false);
  const [validateBedroom, setValidateBedroom] = React.useState(false);
  const [validateBathroom, setValidateBathroom] = React.useState(false);

  if (!showCreateListing) {
    return null;
  }

  const handleInputNameChange = (event) => {
    setInputNameValue(event.target.value);
    setValidateName(false);
  };
  
  const handleInputSummaryChange = (event) => {
    setInputSummaryValue(event.target.value);
  };

  const handleInputBedroomChange = (event) => {
    setInputBedroomValue(event.target.value);

    if(isFloat(`${event.target.value}`)) {
      setValidateBedroom(false);
    }
  };

  const handleInputBathroomChange = (event) => {
    setInputBathroomValue(event.target.value);

    if(isFloat(`${event.target.value}`)) {
      setValidateBathroom(false);
    }
  };

  const handleOnClose = () => {
    setValidateName(false);
    setValidateBedroom(false);
    setValidateBathroom(false);
    onClose();
  }

  const handleAction = () => {
    let noErrors = true
    
    if(validate(inputNameValue)) {
      setValidateName(true);
      noErrors = false;
    }
    if(!isFloat(`${inputBedroomValue}`)) {
      setValidateBedroom(true);
      noErrors = false;
    }

    if(!isFloat(`${inputBathroomValue}`)) {
      setValidateBathroom(true);
      noErrors = false;
    }
    
    if(noErrors) {
      createNewListing();
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

  const validateNumber = (num) => {
    const isAFloat = isFloat(`{num}`);

  }

  const createNewListing = async () => {
    try {
      let jsonData = {
        name: `${inputNameValue}`,
        summary: `${inputSummaryValue}`,
        bedrooms: `${inputBedroomValue}`,
        bathrooms: `${inputBathroomValue}`
      }
      const id = await api.create(jsonData);
      console.log(`This is the id ${id}`);
      let newData = {
        _id: `${id}`,
        name: `${inputNameValue}`,
        summary: `${inputSummaryValue}`,
        bedrooms: `${inputBedroomValue}`,
        bathrooms: `${inputBathroomValue}`
      };

      updateTableData(newData);

      setInputNameValue("");
      setInputSummaryValue("");
      setInputBedroomValue("");
      setInputBathroomValue("");
     

    } catch (error) {
      console.error('Error in creating listing', error);
    }
  };

  return (
    
      <div className='popup' name='Create'>
        <div className='popup-content'>
          <div className='model-header'>
            <h2 className='model-title'>Create New Listing</h2>
          </div>
          <div className='model-body'>
            <TextField title="Enter Listing Name"
              placeHolder="Enter name"
              name="listingName"
              inputValue={inputNameValue}
              handleInputChange={handleInputNameChange} 
              validate={validateName}
              error="Name can't be empty" />

            <TextField title="Enter Listing Summary"
              placeHolder="Enter summary"
              name="listingSummary"
              inputValue={inputSummaryValue}
              handleInputChange={handleInputSummaryChange} 
              validate={false}
              error="" />

            <TextField title="Enter Listing Bedrooms"
              placeHolder="Enter # of Bedrooms"
              name="listingBedrooms"
              inputValue={inputBedroomValue}
              handleInputChange={handleInputBedroomChange} 
              validate={validateBedroom}
              error="Bedrooms must be a number" />
            <TextField title="Enter Listing Bathrooms"
              placeHolder="Enter # of Bathrooms"
              name="listingBathrooms"
              inputValue={inputBathroomValue}
              handleInputChange={handleInputBathroomChange} 
              validate={validateBathroom}
              error="Bathrooms must be a number" />           
          </div>
          <div className='model-footer'>
            <button onClick={handleAction} className="button" name='addBtn'>Add Listing</button>
            <button className='button' onClick={handleOnClose}>Close</button>
          </div>
        </div>
      </div>
    
  );
}