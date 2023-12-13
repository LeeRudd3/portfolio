import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../Components/Login/Login';
import useToken from './App/useToken';
import Profile from './Profile';
import Venue from './Venue/Venue';
import Logout from './Login/Logout';


const Dashboard = () => {

  const {token, settoken }= useToken();
  const [showVenue, setShowVenue]=useState(true);
  const [showProfile, setShowProfile]=useState(false);
  const [header, setHeaderTxt] = useState('Music Venues');
  const navigate = useNavigate();

  if(!token) {
    return<Login settoken={settoken} />
  }

  const setShowVenueStatus = () => {
    setHeaderTxt('Music Venues');
    setShowVenue(true);
    setShowProfile(false);
  }

  const setShowProfileStatus = () => {
    setHeaderTxt('Profile');
    setShowVenue(false);
    setShowProfile(true);
  }

  return (
    <div style={{ display: 'flex' }}>
      {/* Left Panel */}
      <div style={{ width: '150px', backgroundColor: '#0056b3', color: '#fff', padding: '20px', borderRadius: '0 10px 10px 0' }}>
        <h2>Navigation </h2>
        <ul>
          <button className="button" id="homeBtn" onClick={() => navigate('/')}>Home</button>
          <button className="button" id="venueBtn" onClick={() => setShowVenueStatus()}>Venues</button>
          <button className="button" id="profileBtn" onClick={() => setShowProfileStatus()}>Profile</button>
          <Logout />
        </ul>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1 }}>
        {/* Header */}
        <header style={{ backgroundColor: '#0056b3', color: '#fff', padding: '15px', textAlign: 'center', borderRadius: '10px 10px 0 0' }}>
          <h1>{`${header}`}</h1>
        </header>

        {/* Main Content */}
        <main style={{ marginTop: '20px' }}>
          <Venue showVenue={showVenue}/>
          <Profile showProfile={showProfile} />
        </main>
      </div>
    </div>
  );
}

export default Dashboard