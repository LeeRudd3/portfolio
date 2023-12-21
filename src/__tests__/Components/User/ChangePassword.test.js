import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import ChangePassword from '../../../Components/User/ChangePassword.jsx'; 
import API from '../../../Components/App/API/API.js'; 

describe('ChangePassword', () => {
    
  const change = async (mockData, onClose, showChangePassword, id, email, token) => {
    const { getByText, getByPlaceholderText, getByTitle, getByTestId } = render(
      <ChangePassword onClose={onClose}
      showChangePassword={showChangePassword}
      id={id}
      email={email}
      token={token} />
    );

    const current = getByTestId('currentPassword');
    const password = getByTestId('password');
    const retypePassword = getByTestId('Retype');

    // Simulate editing the input fields
    fireEvent.change(current, { target: { value: mockData['current'] } });
    fireEvent.change(password, { target: { value: mockData['password'] } });
    fireEvent.change(retypePassword, { target: { value: mockData['retypePassword'] } });

    // Simulate clicking the Create button
    const changePasswordButton = getByTestId('changeBtn');
    fireEvent.click(changePasswordButton);

    // Wait for the API call to resolve
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });
  };

  it('should call ChangePassword and change user password', async () => {
    const mockData = {
        current: '123123',
        password: '123abc',
        retypePassword: '123abc'
    };

    const sentMockData = {
        password: "MTIzYWJj",
    };

    const returnMockData = {
      _id: '111222333',
    };

    const returnToken = {
        token: '12345'
    }

    // Mock the API.edit method
    API.prototype.authUser = jest.fn().mockResolvedValue(returnToken);
    API.prototype.editBasicUser = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const showChangePassword = jest.fn();
    const onClose = jest.fn();
    const id = '111222333';
    const email = "test@jesttest.com";
    const token = jest.fn();

    // Here we simulate adding the listing based on mock data
    await change(mockData, onClose, showChangePassword, id, email, token);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.editBasicUser).toHaveBeenCalledWith(token, id, sentMockData);

    // Verify that the getTableData and onClose functions were called
    expect(onClose).toHaveBeenCalled();
  });

  it('should call error if passwords do not match', async () => {
    const mockData = {
        current: '123123',
        password: '123abc',
        retypePassword: 'abc123'
    };

    const sentMockData = {
        password: "MTIzYWJj",
    };

    const returnMockData = {
      _id: '111222333',
    };

    const returnToken = {
        token: '12345'
    }

    // Mock the API.edit method
    API.prototype.authUser = jest.fn().mockResolvedValue(returnToken);
    API.prototype.editBasicUser = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const showChangePassword = jest.fn();
    const onClose = jest.fn();
    const id = '111222333';
    const email = "test@jesttest.com";
    const token = jest.fn();

    // Here we simulate adding the listing based on mock data
    await change(mockData, onClose, showChangePassword, id, email, token);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.editBasicUser).not.toHaveBeenCalledWith(token, id, sentMockData);

    // Verify that the getTableData and onClose functions were called
    expect(onClose).not.toHaveBeenCalled();
  });

  
});