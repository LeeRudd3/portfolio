import React, { useState, useEffect, Component } from 'react';
import useToken from './App/useToken';
import EditUser from './User/EditUser';
import ChangePassword from './User/ChangePassword';
import DeleteUser from './User/DeleteUser';
import Logout from './Login/Logout';

import { useNavigate } from 'react-router-dom';

async function getData(token) {
  const response = await fetch(`/users/byemail/${token.email}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.token}`
    }
  });
  return await response.json();
}

const Profile = ( { showProfile }) => {
  const {token, settoken }= useToken();
  const [inputIDValue, setInputIDValue] = useState('');
  const [inputEmailValue, setInputEmailValue] = useState('');
  const [inputFirstValue, setInputFirstValue] = useState('');
  const [inputLastValue, setInputLastValue] = useState('');
  const navigate = useNavigate();
  const [showEditUser, setShowEditUser] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  useEffect(() => {
    async function getData2() {
      const res = await getData(token);
      setInputIDValue(res._id);
      setInputEmailValue(res.email);
      setInputFirstValue(res.firstName);
      setInputLastValue(res.lastName);
    }
    if(token){
      getData2();
    }
  }, []);

  if (!showProfile) {
    return null;
  }

  const handleLogOut = () => {
    settoken(null);
    navigate('/');
  }

  const handleClosePopup = () => {
    setShowEditUser(false);
    setShowChangePassword(false);
    setShowDeleteUser(false);
  };

  return (
    <div>
      <h1>User Profile for {inputIDValue}</h1>
      <table>
        <tbody>
          <tr>
            <td>Username</td>
            <td>{inputEmailValue}</td>
          </tr>
          <tr>
            <td>First Name</td>
            <td>{inputFirstValue}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{inputLastValue}</td>
          </tr>
        </tbody>
      </table>
            
      <button className="button" id="editBtn" onClick={() => setShowEditUser(true)}>Edit User Info</button>
      <EditUser onClose={handleClosePopup}
        showEditUser={showEditUser}
        id={inputIDValue}
        email={inputEmailValue}
        setEmail={setInputEmailValue}
        firstName={inputFirstValue}
        setFirstName={setInputFirstValue}
        lastName={inputLastValue}
        setLastName={setInputLastValue}
        token={token}
        />
      <button className="button" id="changePaswordBtn" onClick={() => setShowChangePassword(true)}>Change Password</button>
      <ChangePassword onClose={handleClosePopup}
        showChangePassword={showChangePassword}
        id={inputIDValue}
        email={inputEmailValue}
        token={token}
       />
      <button className="button" id="deleteUserBtn" onClick={() => setShowDeleteUser(true)}>Delete Your User</button>
      <DeleteUser onClose={handleClosePopup}
        showDeleteUser={showDeleteUser}
        id={inputIDValue}
        email={inputEmailValue}
        token={token}
       />          
      <Logout />
    </div>
    
  )
}

export default Profile