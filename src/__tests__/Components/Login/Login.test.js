import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import Login from '../../../Components/Login/Login.jsx'; 
import API from '../../../Components/App/API/API.js'; 

describe('Login', () => {
    
  const login = async (mockData, settoken) => {
    const { getByText, getByPlaceholderText } = render(
      <Login settoken={settoken} />
    );

    const username = getByPlaceholderText('JohnDoe');
    const password = getByPlaceholderText('Please enter a strong password');

    // Simulate editing the input fields
    fireEvent.change(username, { target: { value: mockData['email'] } });
    fireEvent.change(password, { target: { value: mockData['password'] } });

    // Simulate clicking the Create button
    const loginButton = getByText('Submit');
    fireEvent.click(loginButton);

    // Wait for the API call to resolve
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });
  };

  it('should call login with valid user', async () => {
    const mockData = {
        email: 'test@jesttest.com',
        password: 'MTIzYWJj'
    };

    const sentMockData = {
        email: 'test@jesttest.com',
        password: 'TVRJellXSmo='
    };

    const returnMockData = {
        token: '12345',
    };

    // Mock the API.edit method
    API.prototype.login = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const settoken = jest.fn();

    // Here we simulate adding the listing based on mock data
    await login(mockData, settoken);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.login).toHaveBeenCalledWith(sentMockData);
  });
  
});