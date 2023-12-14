import React, { useState, useEffect, Component } from "react";
import PasswordTextField from '../App/UIComponents/passwordTextField';
import API from '../App/API/API';

const ChangePassword = (props) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [retype, setRetype] = useState('');
    const [validation, setValidation] = useState('');

    const api = new API();
    
    if (!props.showChangePassword) {
        return null;
    }

    const handleInputCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
    };

    const handleInputPasswordChange = (event) => {
        setValidation('');
        setPassword(event.target.value);
    };

    const handleInputRetypeChange = (event) => {
        setValidation('');
        setRetype(event.target.value);
    };

    const handleOnCancel = () => {
        setCurrentPassword('');
        setPassword('');
        setRetype('');
        props.onClose();
    }

    const handleOnClick = async() => {
        //If we make a change, we set this to true
        let needToEdit=false;
        
        //Set up data to send
        let jsonData = {};
        
        try {
            if(password === retype){
                await api.authUser({
                    email: props.email,
                    password: btoa(currentPassword)
                });
                //token.email = props.email;
                //settoken(token);
                needToEdit=true;
                jsonData.password = `${btoa(password)}`;
            }
            else {
                setValidation(`Passwords do not match!`);
            }

        }catch (err) {
            setValidation(`${err}`);
        }

        //If we have a change, we will call the api.  If no change, we make no call
        if(needToEdit) {
            api.editBasicUser(props.token, props.id, jsonData);
            props.onClose();
        }

        
    };

    return (
        <div className='popup' name='changepassword'>
            <div className='popup-content'>
                <div className='model-header'>
                    <h2 className='model-title'>Change Password</h2>
                </div>
                <div className='model-body'>
                    <PasswordTextField title="Current Password"
                            name="currentPassword"
                            inputValue={currentPassword}
                            handleInputChange={handleInputCurrentPasswordChange} 
                            validate={false}
                            error="" />
                    <PasswordTextField title="Enter New Password"
                        name="password"
                        inputValue={password}
                        handleInputChange={handleInputPasswordChange} 
                        validate={false}
                        error="" />
                    <PasswordTextField title="Reenter New Password"
                        name="Retype"
                        inputValue={retype}
                        handleInputChange={handleInputRetypeChange} 
                        validate={false}
                        error="" />
                    <p>{`${validation}`}</p>
                </div>
                <div className='model-footer'>
                    <button onClick={handleOnClick} className="button" name='changeBtn'>Change Password</button>
                    <button className='button' onClick={handleOnCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
  
}

export default ChangePassword