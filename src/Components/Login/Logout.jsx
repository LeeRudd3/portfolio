import React, { useState, useEffect, Component } from 'react';
import useToken from '../App/useToken';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {token, settoken }= useToken();
    const navigate = useNavigate();

    const handleLogOut = () => {
        settoken(null);
        navigate('/');
      }

      return (
        <div>
            <button className="button" id="logoutBtn" onClick={() => handleLogOut()}>Logout</button>
    </div>
    
  )
}

export default Logout