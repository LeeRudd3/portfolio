import React, { useState, useEffect, Component } from "react";
import TextField from '../App/UIComponents/textField.jsx';
import API from '../App/API/API.js';

const EditUser = (props) => {
    const [backupEmailValue, setbackupEmailValue] = useState(props.email);
    const [backupFirstNameValue, setbackupFirstNameValue] = useState(props.firstName);
    const [backupLastNameValue, setbackupLastNameValue] = useState(props.lastName);
    const [inputEmailValue, setInputEmailValue] = useState(props.email);
    const [inputFirstValue, setInputFirstValue] = useState(props.firstName);
    const [inputLastValue, setInputLastValue] = useState(props.lastName);

    const api = new API(process.env.REACT_APP_API_URL);
    
    if (!props.showEditUser) {
        return null;
    }

    /*
    if(typeof backupEmailValue === 'undefined'){
        setbackupEmailValue(props.email);
    }

    if(typeof backupFirstNameValue === 'undefined'){
        setbackupFirstNameValue(props.firstName);
    }

    if(typeof backupLastNameValue === 'undefined'){
        setbackupLastNameValue(props.lastName);
    }
    */

    const handleInputEmailChange = (event) => {
        //props.setEmail(event.target.value);
        setInputEmailValue(event.target.value);
    };

    const handleInputFirstNameChange = (event) => {
        //props.setFirstName(event.target.value);
        setInputFirstValue(event.target.value);
    };

    const handleInputLastNameChange = (event) => {
        //props.setLastName(event.target.value);
        setInputLastValue(event.target.value);
    };

    const handleOnClose = () => {
        props.onClose();
    };

    const handleOnCancel = () => {
        props.setEmail(backupEmailValue);
        props.setFirstName(backupFirstNameValue);
        props.setLastName(backupLastNameValue);
        props.onClose();
    }

    const handleOnClick = () => {
        
        //If we make a change, we set this to true
        let needToEdit=false;
        
        //Set up data to send
        let jsonData = {};
        
        if(backupEmailValue !== inputEmailValue){
            props.setEmail(inputEmailValue);
            jsonData.email = `${inputEmailValue}`;
            needToEdit=true;
        }

        if(backupFirstNameValue !== inputFirstValue){
            props.setFirstName(inputFirstValue);
            jsonData.firstName = `${inputFirstValue}`;
            needToEdit=true;
        }

        if(backupLastNameValue !== inputLastValue){
            props.setLastName(inputLastValue);
            jsonData.lastName = `${inputLastValue}`;
            needToEdit=true;
        }

        //If we have a change, we will call the api.  If no change, we make no call
        if(needToEdit) {
            api.editBasicUser(props.token, props.id, jsonData);
        }

        props.onClose();
    };

    return (
        <div className='popup' name='edituser'>
            <div className='popup-content'>
                <div className='model-header'>
                    <h2 className='model-title'>Edit User</h2>
                </div>
                <div className='model-body'>
                    <TextField title="Email"
                            name="email"
                            inputValue={inputEmailValue}
                            handleInputChange={handleInputEmailChange} 
                            validate={false}
                            error="" />
                    <TextField title="First Name"
                        name="firstName"
                        inputValue={inputFirstValue}
                        handleInputChange={handleInputFirstNameChange} 
                        validate={false}
                        error="" />
                    <TextField title="Last Name"
                        name="lastName"
                        inputValue={inputLastValue}
                        handleInputChange={handleInputLastNameChange} 
                        validate={false}
                        error="" />
                </div>
                <div className='model-footer'>
                    <button onClick={handleOnClick} className="button" name='editBtn' data-testid='editBtn'>Edit User</button>
                    <button className='button' onClick={handleOnCancel} data-testid='cancelBtn'>Cancel</button>
                </div>
            </div>
        </div>
    );
  
}

export default EditUser