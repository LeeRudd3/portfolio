/*import React, { useState } from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';
import Profile from '../../Components/Profile.jsx'; 
import API from '../../Components/App/API/API.js'; 

describe('Profile', () => {
    
  const profile = async (mockData, showProfile, token) => {
    act(() => {
      const { getByText, getByTestId } = render(
          <Profile showProfile={true}
            token={token}
          />, {wrapper: BrowserRouter}
      );

      expect(getByTestId('email').textContent).toEqual(mockData.email);
    });

    

    // Wait for the API call to resolve
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });
  };

  it('should show user profile', async () => {
    
    const mockData = {
        _id: '1234567',
        email: 'changetest@jesttest.com',
        firstName: 'changeFirstName',
        lastName: 'changeLastName'
    };

    const sentMockData = {
        _id: '1234567',
        email: 'changetest@jesttest.com',
        firstName: 'changeFirstName',
        lastName: 'changeLastName'
    };

    const returnToken = {
      token: '12345',
      email: 'changetest@jesttest.com'
        
    }

    const returnMockData = {
      _id: '111222333',
    };

    // Mock other functions
    const showProfile = jest.fn(true);
    const token = jest.fn();

    // Mock the API.edit method
    API.prototype.authUser = jest.fn().mockResolvedValue(returnToken);
    API.prototype.getUserByEmail = jest.fn().mockResolvedValue(returnMockData);

    // Here we simulate adding the listing based on mock data
    await profile(mockData, showProfile, token);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.getUserByEmail).toHaveBeenCalledWith(mockData.email, token);
  });

});*/

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Profile from '../../Components/Profile';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom';
//import API from '../../Components/App/API/API';

// Mocking the API module
jest.mock('../../Components/App/API/API', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    getUserByEmail: jest.fn(() => Promise.resolve({
      _id: 'mockUserId',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
    })),
  })),
}));

describe('Profile component', () => {
  it('renders profile information correctly', async () => {
    // Mocking token
    const mockToken = { email: 'test@example.com' };

    render(<Profile showProfile={true} token={mockToken} />, {wrapper: BrowserRouter});

    // Wait for data to be loaded
    await screen.findByTestId('email');

    expect(screen.getByTestId('titleemail').textContent).toEqual('Username');
    expect(screen.getByTestId('email').textContent).toEqual('test@example.com');
    expect(screen.getByTestId('firstName').textContent).toEqual('John');
    expect(screen.getByTestId('lastName').textContent).toEqual('Doe');
  });

  it('opens and closes Edit User popup', async () => {
    const mockToken = { email: 'test@example.com' };

    render(<Profile showProfile={true} token={mockToken} />, {wrapper: BrowserRouter});

    // Wait for data to be loaded
    await screen.findByTestId('email');
    
    fireEvent.click(screen.getByText('Edit User Info'));

    expect(screen.queryByTestId('editBtn')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('cancelBtn'));

    expect(screen.queryByTestId('editBtn')).not.toBeInTheDocument();
  });

  it('opens and closes Delete User popup', async () => {
    const mockToken = { email: 'test@example.com' };

    render(<Profile showProfile={true} token={mockToken} />, {wrapper: BrowserRouter});

    // Wait for data to be loaded
    await screen.findByTestId('email');
    
    fireEvent.click(screen.getByText('Delete Your User'));

    expect(screen.queryByTestId('deleteBtn')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('cancelBtn'));

    expect(screen.queryByTestId('deleteBtn')).not.toBeInTheDocument();
  });

  it('opens and closes chane password popup', async () => {
    const mockToken = { email: 'test@example.com' };

    render(<Profile showProfile={true} token={mockToken} />, {wrapper: BrowserRouter});

    // Wait for data to be loaded
    await screen.findByTestId('email');
    
    fireEvent.click(screen.getByText('Change Password'));

    expect(screen.queryByTestId('changeBtn')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('cancelBtn'));

    expect(screen.queryByTestId('changeBtn')).not.toBeInTheDocument();
  });

  // Similarly, you can write tests for Change Password and Delete User popups
});
