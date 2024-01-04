import React, { useState, useEffect } from 'react';
//import useToken from './App/useToken';
import EditUser from './User/EditUser';
import ChangePassword from './User/ChangePassword';
import DeleteUser from './User/DeleteUser';
import Logout from './Login/Logout';
import API from './App/API/API';

const Profile = ( { showProfile, token }) => {
  const [inputIDValue, setInputIDValue] = useState('');
  const [inputEmailValue, setInputEmailValue] = useState('');
  const [inputFirstValue, setInputFirstValue] = useState('');
  const [inputLastValue, setInputLastValue] = useState('');
  const [showEditUser, setShowEditUser] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  

  useEffect(() => {
    async function getData() {
      const api = new API();
      const res = await api.getUserByEmail(token.email, token);
      setInputIDValue(res._id);
      setInputEmailValue(res.email);
      setInputFirstValue(res.firstName);
      setInputLastValue(res.lastName);
    }
    getData();
  }, []);

  if (!showProfile) {
    return null;
  }

  const handleClosePopup = () => {
    setShowEditUser(false);
    setShowChangePassword(false);
    setShowDeleteUser(false);
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td data-testid="titleemail">Username</td>
            <td data-testid="email">{inputEmailValue}</td>
          </tr>
          <tr>
            <td>First Name</td>
            <td data-testid="firstName">{inputFirstValue}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td data-testid="lastName">{inputLastValue}</td>
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