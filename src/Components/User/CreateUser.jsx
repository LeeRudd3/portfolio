import React, { useState } from 'react';
import TextField from '../App/UIComponents/textField';
import PasswordTextField from '../App/UIComponents/passwordTextField';
import API from '../App/API/API'

async function createUser(credentials) {
    return fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function CreateNewUser({ onClose, showCreateUser }) {
  const [inputEmailValue, setInputEmailValue] = useState('');
  const [inputFirstValue, setInputFirstValue] = useState('');
  const [inputLastValue, setInputLastValue] = useState('');
  const [inputPasswordValue, setInputPasswordValue] = useState('');
  const [inputVerifyPasswordValue, setInputVerifyPasswordValue] = useState('');
  const [validationMSG, setValidationMSG] = useState('');

  const api = new API(process.env.REACT_APP_API_URL);

  if (!showCreateUser) {
    return null;
  }

  const handleInputEmailChange = (event) => {
    setInputEmailValue(event.target.value);
  };

  const handleInputFirstChange = (event) => {
    setInputFirstValue(event.target.value);
  };

  const handleInputLastChange = (event) => {
    setInputLastValue(event.target.value);
  };

  const handleInputPasswordChange = (event) => {
    setInputPasswordValue(event.target.value);
  };

  const handleInputVerifyPasswordChange = (event) => {
    setInputVerifyPasswordValue(event.target.value);
  };

  const handleOnClose = () => {
    /*setValidateName(false);
    setValidateBedroom(false);
    setValidateBathroom(false);*/
    onClose();
  }

  const handleAction = () => {
    let noErrors = true

    if(inputPasswordValue !== inputVerifyPasswordValue) {
      setValidationMSG('Passwords do not match');
      noErrors = false;
    }

    if(noErrors) {
      createNewUser();
      // Close the pop-up
      onClose();
    }
    //}
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

  const createNewUser = async () => {
    
    try {
      setValidationMSG('');
      let jsonData = {
        firstName: `${inputFirstValue}`,
        lastName: `${inputLastValue}`,
        email: `${inputEmailValue}`,
        password: `${btoa(inputPasswordValue)}`,
        permissionLevel: `2057`
      }
      api.createUser(jsonData);

    } catch (error) {
      console.error('Error in creating user', error);
      setValidationMSG('Error in creating user');
    }
  };

  return (
    <div className='popup' name='Create'>
        <div className='popup-content'>
          <div className='model-header'>
            <h2 className='model-title'>Create New User</h2>
          </div>
          <div className='model-body'>
            {validationMSG}
            <TextField title="User Name"
                placeHolder="Enter Email"
                name="userName"
                inputValue={inputEmailValue}
                handleInputChange={handleInputEmailChange} 
                validate={false}
                error="" />
            <TextField title="First Name"
                placeHolder="Enter First Name"
                name="firstName"
                inputValue={inputFirstValue}
                handleInputChange={handleInputFirstChange} 
                validate={false}
                error="" />
            <TextField title="Last Name"
                placeHolder="Enter Last Name"
                name="lastName"
                inputValue={inputLastValue}
                handleInputChange={handleInputLastChange} 
                validate={false}
                error="" />
            <PasswordTextField title="Password"
                placeHolder="Enter Password"
                name="password"
                inputValue={inputPasswordValue}
                handleInputChange={handleInputPasswordChange} 
                validate={false}
                error="" />
            <PasswordTextField title="Reenter Password"
                placeHolder="Reenter Password"
                name="reenterPassword"
                inputValue={inputVerifyPasswordValue}
                handleInputChange={handleInputVerifyPasswordChange} 
                validate={false}
                error="" />
            </div>
          <div className='model-footer'>
            <button onClick={handleAction} className="button" name='addBtn'>Create User</button>
            <button className='button' onClick={handleOnClose}>Close</button>
          </div>
        </div>
      </div>
  );
}