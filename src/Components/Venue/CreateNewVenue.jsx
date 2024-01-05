import React, { useState } from 'react';
import API from '../App/API/API.js';
import TextField from '../App/UIComponents/textField.jsx'

export default function CreateNewVenue({ onClose, showCreateVenue, updateTableData }) {
  const api = new API(process.env.REACT_APP_API_URL);
  const [inputNameValue, setInputNameValue] = useState('');
  const [inputSummaryValue, setInputSummaryValue] = useState('');
  const [inputTypeValue, setInputTypeValue] = useState('');
  const [inputAddress1Value, setInputAddress1Value] = useState('');
  const [inputAddress2Value, setInputAddress2Value] = useState('');
  const [inputCityValue, setInputCityValue] = useState('');
  const [inputStateValue, setInputStateValue] = useState('');
  const [validateName, setValidateName] = useState(false);

  if (!showCreateVenue) {
    return null;
  }

  const handleInputNameChange = (event) => {
    setInputNameValue(event.target.value);
    setValidateName(false);
  };
  
  const handleInputSummaryChange = (event) => {
    setInputSummaryValue(event.target.value);
  };

  const handleInputTypeChange = (event) => {
    setInputTypeValue(event.target.value);
  };

  const handleInputAddress1Change = (event) => {
    setInputAddress1Value(event.target.value);
  };

  const handleInputAddress2Change = (event) => {
    setInputAddress2Value(event.target.value);
  };

  const handleInputCityChange = (event) => {
    setInputCityValue(event.target.value);
  };

  const handleInputStateChange = (event) => {
    setInputStateValue(event.target.value);
  };

  const handleOnClose = () => {
    setValidateName(false);
    onClose();
  }

  const handleAction = () => {
    let noErrors = true
    
    if(validate(inputNameValue)) {
      setValidateName(true);
      noErrors = false;
    }
    
    if(noErrors) {
      createNewVenue();
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

  const createNewVenue = async () => {
    try {
      let jsonData = {
        name: `${inputNameValue}`,
        summary: `${inputSummaryValue}`,
        type: `${inputTypeValue}`,
        address1: `${inputAddress1Value}`,
        address2: `${inputAddress2Value}`,
        city: `${inputCityValue}`,
        state: `${inputStateValue}`
      }
      const id = await api.create(jsonData);
      let newData = {
        _id: `${id}`,
        name: `${inputNameValue}`,
        summary: `${inputSummaryValue}`,
        type: `${inputTypeValue}`,
        address1: `${inputAddress1Value}`,
        address2: `${inputAddress2Value}`,
        city: `${inputCityValue}`,
        state: `${inputStateValue}`
      };

      updateTableData(newData);

      setInputNameValue("");
      setInputSummaryValue("");
      setInputTypeValue("");
      setInputAddress1Value("");
      setInputAddress2Value("");
      setInputCityValue("");
      setInputStateValue("");
     

    } catch (error) {
      console.error('Error in creating venue', error);
    }
  };

  return (
    
      <div className='popup' name='Create'>
        <div className='popup-content'>
          <div className='model-header'>
            <h2 className='model-title'>Create New Venue</h2>
          </div>
          <div className='model-body'>
            <TextField title="Enter Venue Name"
              placeHolder="Enter name"
              name="venueName"
              inputValue={inputNameValue}
              handleInputChange={handleInputNameChange} 
              validate={validateName}
              error="Name can't be empty" />

            <TextField title="Enter Venue Summary"
              placeHolder="Enter summary"
              name="venueSummary"
              inputValue={inputSummaryValue}
              handleInputChange={handleInputSummaryChange} 
              validate={false}
              error="" />

            <TextField title="Enter Venue Type"
              placeHolder="IE Stadium, Bar, Wedding, ..."
              name="venueType"
              inputValue={inputTypeValue}
              handleInputChange={handleInputTypeChange} 
              validate={false}
              error="" />
              
            <TextField title="Enter Address 1"
              placeHolder="Enter Address"
              name="venueAddress1"
              inputValue={inputAddress1Value}
              handleInputChange={handleInputAddress1Change} 
              validate={false}
              error="" />

            <TextField title="Enter Address 2"
              placeHolder="Enter Address 2"
              name="venueAddress2"
              inputValue={inputAddress2Value}
              handleInputChange={handleInputAddress2Change} 
              validate={false}
              error="" /> 

            <TextField title="Enter City"
              placeHolder="Enter City"
              name="venueCity"
              inputValue={inputCityValue}
              handleInputChange={handleInputCityChange} 
              validate={false}
              error="" />

            <TextField title="Enter State"
              placeHolder="Enter State"
              name="venueState"
              inputValue={inputStateValue}
              handleInputChange={handleInputStateChange} 
              validate={false}
              error="" />
          </div>
          <div className='model-footer'>
            <button onClick={handleAction} className="button" name='addBtn' data-testid="addBtn">Add Venue</button>
            <button className='button' onClick={handleOnClose} data-testid="closeBtn">Close</button>
          </div>
        </div>
      </div>
    
  );
}