import React, { useState, useEffect, Component } from "react";
import TextField from '../App/UIComponents/textField.jsx';
import API from '../App/API/API.js';

const EditUser = (props) => {
    const [backupEmailValue, setbackupEmailValue] = useState();
    const [backupFirstNameValue, setbackupFirstNameValue] = useState();
    const [backupLastNameValue, setbackupLastNameValue] = useState();

    const api = new API();
    
    if (!props.showEditUser) {
        return null;
    }

    if(typeof backupEmailValue === 'undefined'){
        setbackupEmailValue(props.email);
    }

    if(typeof backupFirstNameValue === 'undefined'){
        setbackupFirstNameValue(props.firstName);
    }

    if(typeof backupLastNameValue === 'undefined'){
        setbackupLastNameValue(props.lastName);
    }

    const handleInputEmailChange = (event) => {
        props.setEmail(event.target.value);
    };

    const handleInputFirstNameChange = (event) => {
        props.setFirstName(event.target.value);
    };

    const handleInputLastNameChange = (event) => {
        props.setLastName(event.target.value);
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
        
        if(backupEmailValue !== props.email){
            jsonData.email = `${props.email}`;
            needToEdit=true;
        }

        if(backupFirstNameValue !== props.firstName){
            jsonData.firstName = `${props.firstName}`;
            needToEdit=true;
        }

        if(backupLastNameValue !== props.lastName){
            jsonData.lastName = `${props.lastName}`;
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
                            inputValue={props.email}
                            handleInputChange={handleInputEmailChange} 
                            validate={false}
                            error="" />
                    <TextField title="First Name"
                        name="firstName"
                        inputValue={props.firstName}
                        handleInputChange={handleInputFirstNameChange} 
                        validate={false}
                        error="" />
                    <TextField title="Last Name"
                        name="lastName"
                        inputValue={props.lastName}
                        handleInputChange={handleInputLastNameChange} 
                        validate={false}
                        error="" />
                </div>
                <div className='model-footer'>
                    <button onClick={handleOnClick} className="button" name='editBtn'>Edit User</button>
                    <button className='button' onClick={handleOnCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
  
}

export default EditUser