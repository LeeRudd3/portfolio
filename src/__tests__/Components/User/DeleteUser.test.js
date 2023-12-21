import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import DeleteUser from '../../../Components/User/DeleteUser.jsx'; 
import API from '../../../Components/App/API/API.js'; 
import {BrowserRouter, MemoryRouter} from 'react-router-dom'

//Need to  follow this https://www.js-howto.com/how-to-mock-react-router-dom-hooks-in-jest/#google_vignette


describe('DeleteUser', () => {
    
  const deleteUser = async (mockData, onClose, showDeleteUser, id, email, token) => {
    const { getByText, getByPlaceholderText, getByTitle, getByTestId } = render(
      <DeleteUser onClose={onClose}
      showDeleteUser={showDeleteUser}
      id={id}
      email={email}
      token={token} />, {wrapper: BrowserRouter}
    );

    const current = getByTestId('currentPassword');

    // Simulate editing the input fields
    fireEvent.change(current, { target: { value: mockData['current'] } });

    // Simulate clicking the Create button
    const deleteBtn = getByText('Delete Me');
    fireEvent.click(deleteBtn);

    // Wait for the API call to resolve
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });
  };

  const cancelDeleteUser = async (mockData, onClose, showDeleteUser, id, email, token) => {
    const { getByText, getByPlaceholderText, getByTitle, getByTestId } = render(
      <DeleteUser onClose={onClose}
      showDeleteUser={showDeleteUser}
      id={id}
      email={email}
      token={token} />, {wrapper: BrowserRouter}
    );

    const current = getByTestId('currentPassword');

    // Simulate editing the input fields
    fireEvent.change(current, { target: { value: mockData['current'] } });

    // Simulate clicking the Create button
    const cancelBtn = getByText('Cancel');
    fireEvent.click(cancelBtn);

    // Wait for the API call to resolve
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });
  };

  it('should call Delete User and delete user', async () => {
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
    API.prototype.deleteUser = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const showDeleteUser = jest.fn();
    const onClose = jest.fn();
    const id = '111222333';
    const email = "test@jesttest.com";
    const token = jest.fn();

    await deleteUser(mockData, onClose, showDeleteUser, id, email, token)

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.deleteUser).toHaveBeenCalledWith(token, id);

    // Verify that the getTableData and onClose functions were called
    expect(onClose).toHaveBeenCalled();
  });  

  it('Cancel should close popup and return to user profile', async () => {
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
    API.prototype.deleteUser = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const showDeleteUser = jest.fn();
    const onClose = jest.fn();
    const id = '111222333';
    const email = "test@jesttest.com";
    const token = jest.fn();

    await cancelDeleteUser(mockData, onClose, showDeleteUser, id, email, token)

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.deleteUser).not.toHaveBeenCalledWith(token, id);

    // Verify that the getTableData and onClose functions were called
    expect(onClose).toHaveBeenCalled();
  }); 
});