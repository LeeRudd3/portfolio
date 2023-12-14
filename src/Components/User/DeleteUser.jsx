import React, { useState, useEffect, Component } from "react";
import PasswordTextField from '../App/UIComponents/passwordTextField';
import useToken from '../App/useToken';
import { useNavigate } from 'react-router-dom';
import API from '../App/API/API';

const DeleteUser = (props) => {
    const {token, settoken }= useToken();
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [validation, setValidation] = useState('');

    const api = new API();
    
    if (!props.showDeleteUser) {
        return null;
    }

    const handleInputCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
    };

    const handleOnCancel = () => {
        setCurrentPassword('');
        props.onClose();
    }

    const handleOnClick = async() => {
        //If we make a change, we set this to true
        let needToEdit=false;
            
        try {
            
            await api.authUser({
                email: props.email,
                password: btoa(currentPassword)
            });
            needToEdit=true;

        }catch (err) {
            setValidation(`${err}`);
        }

        //If we have a change, we will call the api.  If no change, we make no call
        if(needToEdit) {
            api.deleteUser(props.token, props.id);
            settoken(null);
            navigate('/');
        }

        
    };

    return (
        <div className='popup' name='changepassword'>
            <div className='popup-content'>
                <div className='model-header'>
                    <h2 className='model-title'>Delete User</h2>
                </div>
                <div className='model-body'>
                    <p>Please Enter Your Password to Delete your User.</p>
                    <p>Warning: Once deleted, you will not be able to log in again</p>
                    <PasswordTextField title="Current Password"
                            name="currentPassword"
                            inputValue={currentPassword}
                            handleInputChange={handleInputCurrentPasswordChange} 
                            validate={false}
                            error="" />
                    <p>{`${validation}`}</p>
                </div>
                <div className='model-footer'>
                    <button onClick={handleOnClick} className="button" name='deleteBtn'>Delete Me</button>
                    <button className='button' onClick={handleOnCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
  
}

export default DeleteUser