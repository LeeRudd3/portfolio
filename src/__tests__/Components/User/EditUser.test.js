import React, { useState } from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import EditUser from '../../../Components/User/EditUser.jsx'; 
import API from '../../../Components/App/API/API.js'; 

describe('EditUser', () => {
    
  const edit = async (mockData, onClose, showEditUser, inputIDValue, inputEmailValue,
    setInputEmailValue, inputFirstValue, setInputFirstValue, inputLastValue, setInputLastValue,
    token) => {
    const { getByText, getByTestId } = render(
        <EditUser onClose={onClose}
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
    );

    const email = getByTestId('email');
    const firstName = getByTestId('firstName');
    const lastName = getByTestId('lastName');

    // Simulate editing the input fields
    fireEvent.change(email, { target: { value: mockData['email'] } });
    fireEvent.change(firstName, { target: { value: mockData['firstName'] } });
    fireEvent.change(lastName, { target: { value: mockData['lastName'] } });

    // Simulate clicking the Create button
    const editButton = getByTestId('editBtn');
    fireEvent.click(editButton);

    // Wait for the API call to resolve
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });
  };

  it('should call editUser and edit user on button click', async () => {
    const mockData = {
        email: 'changetest@jesttest.com',
        firstName: 'changeFirstName',
        lastName: 'changeLastName'
    };

    const sentMockData = {
        email: 'changetest@jesttest.com',
        firstName: 'changeFirstName',
        lastName: 'changeLastName'
    };

    const returnToken = {
        token: '12345'
    }

    const returnMockData = {
      _id: '111222333',
    };

    // Mock other functions
    const onClose = jest.fn();
    const showEditUser = jest.fn();
    const inputIDValue = '111222333';
    const inputEmailValue = 'test@jesttest.com';
    const setInputEmailValue = jest.fn();
    const inputFirstValue = 'FirstName';
    const setInputFirstValue = jest.fn();
    const inputLastValue = 'LastName';
    const setInputLastValue = jest.fn();
    const token = jest.fn();

    // Mock the API.edit method
    API.prototype.authUser = jest.fn().mockResolvedValue(returnToken);
    API.prototype.editBasicUser = jest.fn().mockResolvedValue(returnMockData);

    // Here we simulate adding the listing based on mock data
    await edit(mockData, onClose, showEditUser, inputIDValue, inputEmailValue,
        setInputEmailValue, inputFirstValue, setInputFirstValue, inputLastValue, setInputLastValue,
        token);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.editBasicUser).toHaveBeenCalledWith(token, inputIDValue, sentMockData);

    // Verify that the getTableData and onClose functions were called
    expect(onClose).toHaveBeenCalled();
  });

  it('should edit only first name when only first name is changed', async () => {
    const mockData = {
        email: 'test@jesttest.com',
        firstName: 'changeFirstName',
        lastName: 'LastName'
    };

    const sentMockData = {
        firstName: 'changeFirstName',
    };

    const returnToken = {
        token: '12345'
    }

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.authUser = jest.fn().mockResolvedValue(returnToken);
    API.prototype.editBasicUser = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const onClose = jest.fn();
    const showEditUser = jest.fn();
    const inputIDValue = '111222333';
    const inputEmailValue = 'test@jesttest.com';
    const setInputEmailValue = jest.fn();
    const inputFirstValue = 'FirstName';
    const setInputFirstValue = jest.fn();
    const inputLastValue = 'LastName';
    const setInputLastValue = jest.fn();
    const token = jest.fn();

    // Here we simulate adding the listing based on mock data
    await edit(mockData, onClose, showEditUser, inputIDValue, inputEmailValue,
        setInputEmailValue, inputFirstValue, setInputFirstValue, inputLastValue, setInputLastValue,
        token);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.editBasicUser).toHaveBeenCalledWith(token, inputIDValue, sentMockData);

    // Verify that the getTableData and onClose functions were called
    expect(onClose).toHaveBeenCalled();
  });

  it('should edit only last name when only last name is changed', async () => {
    const mockData = {
        email: 'test@jesttest.com',
        firstName: 'FirstName',
        lastName: 'ChangeLastName'
    };

    const sentMockData = {
        lastName: 'ChangeLastName',
    };

    const returnToken = {
        token: '12345'
    }

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.authUser = jest.fn().mockResolvedValue(returnToken);
    API.prototype.editBasicUser = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const onClose = jest.fn();
    const showEditUser = jest.fn();
    const inputIDValue = '111222333';
    const inputEmailValue = 'test@jesttest.com';
    const setInputEmailValue = jest.fn();
    const inputFirstValue = 'FirstName';
    const setInputFirstValue = jest.fn();
    const inputLastValue = 'LastName';
    const setInputLastValue = jest.fn();
    const token = jest.fn();

    // Here we simulate adding the listing based on mock data
    await edit(mockData, onClose, showEditUser, inputIDValue, inputEmailValue,
        setInputEmailValue, inputFirstValue, setInputFirstValue, inputLastValue, setInputLastValue,
        token);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.editBasicUser).toHaveBeenCalledWith(token, inputIDValue, sentMockData);

    // Verify that the getTableData and onClose functions were called
    expect(onClose).toHaveBeenCalled();
  });

  it('should edit only email when only email is changed', async () => {
    const mockData = {
        email: 'Changetest@jesttest.com',
        firstName: 'FirstName',
        lastName: 'LastName'
    };

    const sentMockData = {
        email: 'Changetest@jesttest.com',
    };

    const returnToken = {
        token: '12345'
    }

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.authUser = jest.fn().mockResolvedValue(returnToken);
    API.prototype.editBasicUser = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const onClose = jest.fn();
    const showEditUser = jest.fn();
    const inputIDValue = '111222333';
    const inputEmailValue = 'test@jesttest.com';
    const setInputEmailValue = jest.fn();
    const inputFirstValue = 'FirstName';
    const setInputFirstValue = jest.fn();
    const inputLastValue = 'LastName';
    const setInputLastValue = jest.fn();
    const token = jest.fn();

    // Here we simulate adding the listing based on mock data
    await edit(mockData, onClose, showEditUser, inputIDValue, inputEmailValue,
        setInputEmailValue, inputFirstValue, setInputFirstValue, inputLastValue, setInputLastValue,
        token);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.editBasicUser).toHaveBeenCalledWith(token, inputIDValue, sentMockData);

    // Verify that the getTableData and onClose functions were called
    expect(onClose).toHaveBeenCalled();
  });

  it('should edit only email and last name when only email and last nameis changed', async () => {
    const mockData = {
        email: 'Changetest@jesttest.com',
        firstName: 'FirstName',
        lastName: 'ChangeLastName'
    };

    const sentMockData = {
        email: 'Changetest@jesttest.com',
        lastName: 'ChangeLastName'
    };

    const returnToken = {
        token: '12345'
    }

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.authUser = jest.fn().mockResolvedValue(returnToken);
    API.prototype.editBasicUser = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const onClose = jest.fn();
    const showEditUser = jest.fn();
    const inputIDValue = '111222333';
    const inputEmailValue = 'test@jesttest.com';
    const setInputEmailValue = jest.fn();
    const inputFirstValue = 'FirstName';
    const setInputFirstValue = jest.fn();
    const inputLastValue = 'LastName';
    const setInputLastValue = jest.fn();
    const token = jest.fn();

    // Here we simulate adding the listing based on mock data
    await edit(mockData, onClose, showEditUser, inputIDValue, inputEmailValue,
        setInputEmailValue, inputFirstValue, setInputFirstValue, inputLastValue, setInputLastValue,
        token);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.editBasicUser).toHaveBeenCalledWith(token, inputIDValue, sentMockData);

    // Verify that the getTableData and onClose functions were called
    expect(onClose).toHaveBeenCalled();
  });

  it('should not make a call if nothing was changed', async () => {
    const mockData = {
        email: 'test@jesttest.com',
        firstName: 'FirstName',
        lastName: 'LastName'
    };

    const sentMockData = {
    };

    const returnToken = {
        token: '12345'
    }

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.authUser = jest.fn().mockResolvedValue(returnToken);
    API.prototype.editBasicUser = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const onClose = jest.fn();
    const showEditUser = jest.fn();
    const inputIDValue = '111222333';
    const inputEmailValue = 'test@jesttest.com';
    const setInputEmailValue = jest.fn();
    const inputFirstValue = 'FirstName';
    const setInputFirstValue = jest.fn();
    const inputLastValue = 'LastName';
    const setInputLastValue = jest.fn();
    const token = jest.fn();

    // Here we simulate adding the listing based on mock data
    await edit(mockData, onClose, showEditUser, inputIDValue, inputEmailValue,
        setInputEmailValue, inputFirstValue, setInputFirstValue, inputLastValue, setInputLastValue,
        token);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.editBasicUser).not.toHaveBeenCalledWith(token, inputIDValue, sentMockData);

    // Verify that the getTableData and onClose functions were called
    expect(onClose).toHaveBeenCalled();
  });

});