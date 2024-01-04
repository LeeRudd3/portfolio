import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import CreateNewUser from '../../../Components/User/CreateUser.jsx'; 
import API from '../../../Components/App/API/API.js'; 

describe('CreateNewUser', () => {
    
  const add = async (mockData, onClose, showCreateUser) => {
    const { getByText, getByPlaceholderText, getByTitle } = render(
      <CreateNewUser onClose={onClose} showCreateUser={showCreateUser} />
    );

    const email = getByPlaceholderText('Enter Email');
    const firstName = getByPlaceholderText('Enter First Name');
    const lastName = getByPlaceholderText('Enter Last Name');
    const password = getByPlaceholderText('Enter Password');
    const retypePassword = getByPlaceholderText('Reenter Password');

    // Simulate editing the input fields
    fireEvent.change(email, { target: { value: mockData['email'] } });
    fireEvent.change(firstName, { target: { value: mockData['firstName'] } });
    fireEvent.change(lastName, { target: { value: mockData['lastName'] } });
    fireEvent.change(password, { target: { value: mockData['password'] } });
    fireEvent.change(retypePassword, { target: { value: mockData['retypePassword'] } });

    // Simulate clicking the Create button
    const addButton = getByText('Create User');
    fireEvent.click(addButton);

    // Wait for the API call to resolve
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });
  };

  it('should call CreateNewUser and create a new user on button click', async () => {
    const mockData = {
        email: 'test@jesttest.com',
        firstName: 'FirstName',
        lastName: 'LastName',
        password: '123abc',
        retypePassword: '123abc'
    };

    const sentMockData = {
        email: 'test@jesttest.com',
        firstName: 'FirstName',
        lastName: 'LastName',
        password: 'MTIzYWJj',
        permissionLevel: '2057'
    };

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.createUser = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const showCreateUser = jest.fn();
    const onClose = jest.fn();

    // Here we simulate adding the listing based on mock data
    await add(mockData, onClose, showCreateUser);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.createUser).toHaveBeenCalledWith(sentMockData);

    // Verify that the getTableData and onClose functions were called
    expect(onClose).toHaveBeenCalled();
  });

  it('should not call CreateNewUser and create a new user on button click when passwords do not match', async () => {
    const mockData = {
        email: 'test@jesttest.com',
        firstName: 'FirstName',
        lastName: 'LastName',
        password: '123abc',
        retypePassword: '123abcc'
    };

    const sentMockData = {
        email: 'test@jesttest.com',
        firstName: 'FirstName',
        lastName: 'LastName',
        password: 'MTIzYWJj',
        permissionLevel: '2057'
    };

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.createUser = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const showCreateUser = jest.fn();
    const onClose = jest.fn();

    // Here we simulate adding the listing based on mock data
    await add(mockData, onClose, showCreateUser);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.createUser).not.toHaveBeenCalledWith(sentMockData);

    // Verify that the getTableData and onClose functions were called
    expect(onClose).not.toHaveBeenCalled();
  });
});