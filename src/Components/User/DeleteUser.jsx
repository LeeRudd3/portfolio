import React, { useState, useEffect, Component } from "react";
import PasswordTextField from '../App/UIComponents/passwordTextField';
import useToken from '../App/useToken';
import { useNavigate } from 'react-router-dom';


async function deleteUser(token, id) {
    return fetch(`/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.token}`
        }
    });
}

async function authUser(credentials) {
    return fetch('/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); 
        }
        else {
            throw new Error(`Invalid Username or Password`);
        }
        })
}

const DeleteUser = (props) => {
    const {token, settoken }= useToken();
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [validation, setValidation] = useState('');
    
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
            
            await authUser({
                email: props.email,
                password: currentPassword
            });
            needToEdit=true;

        }catch (err) {
            setValidation(`${err}`);
        }

        //If we have a change, we will call the api.  If no change, we make no call
        if(needToEdit) {
            deleteUser(props.token, props.id);
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