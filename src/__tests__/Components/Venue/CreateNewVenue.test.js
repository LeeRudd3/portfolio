import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import CreateNewVenue from '../../../Components/Venue/CreateNewVenue.jsx'; 
import API from '../../../Components/App/API/API.js'; 

describe('CreateNewVenue', () => {
    
  const add = async (mockData, onClose, showCreateVenue, updateTableData) => {
    const { getByText, getByPlaceholderText, getByTitle } = render(
      <CreateNewVenue onClose={onClose} showCreateVenue={showCreateVenue} updateTableData={updateTableData}/>
    );

    const nameInput = getByPlaceholderText('Enter name');
    const summaryTextarea = getByPlaceholderText('Enter summary');
    const typeInput = getByPlaceholderText('IE Stadium, Bar, Wedding, ...');
    const address1Input = getByPlaceholderText('Enter Address');
    const address2Input = getByPlaceholderText('Enter Address 2');
    const cityInput = getByPlaceholderText('Enter City');
    const stateInput = getByPlaceholderText('Enter State');

    // Simulate editing the input fields
    fireEvent.change(nameInput, { target: { value: mockData['name'] } });
    fireEvent.change(summaryTextarea, { target: { value: mockData['summary'] } });
    fireEvent.change(typeInput, { target: { value: mockData['type'] } });
    fireEvent.change(address1Input, { target: { value: mockData['address1'] } });
    fireEvent.change(address2Input, { target: { value: mockData['address2'] } });
    fireEvent.change(cityInput, { target: { value: mockData['city'] } });
    fireEvent.change(stateInput, { target: { value: mockData['state'] } });

    // Simulate clicking the Update button
    const addButton = getByText('Add Venue');
    fireEvent.click(addButton);

    // Wait for the API call to resolve
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });
  };

  it('should call CreateNewVenue and create a new venue on button click', async () => {
    const mockData = {
      name: 'test Venue',
      summary: 'Summary of Venue',
      type: 'Stadium',
      address1: '404 main st',
      address2: 'Unit 5',
      city: 'Newberg',
      state: 'OR'
    };

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.create = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const updateTableData = jest.fn();
    const showCreateVenue = jest.fn();
    const onClose = jest.fn();

    // Here we simulate adding the listing based on mock data
    await add(mockData, onClose, showCreateVenue, updateTableData);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.create).toHaveBeenCalledWith(mockData);

    // Verify that the getTableData and onClose functions were called
    expect(updateTableData).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('should call CreateNewVenue and create a new Venue with no summary', async () => {
    const mockData = {
      name: 'test Venue',
      summary: '',
      type: 'Stadium',
      address1: '404 main st',
      address2: 'Unit 5',
      city: 'Newberg',
      state: 'OR'
    };

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.create = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const updateTableData = jest.fn();
    const showCreateVenue = jest.fn();
    const onClose = jest.fn();

    // Here we simulate adding the listing based on mock data
    await add(mockData, onClose, showCreateVenue, updateTableData);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.create).toHaveBeenCalledWith(mockData);

    // Verify that the getTableData and onClose functions were called
    expect(updateTableData).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('should call CreateNewVenue and create a new venue with no type', async () => {
    const mockData = {
      name: 'test Venue',
      summary: 'Summary of Venue',
      type: '',
      address1: '404 main st',
      address2: 'Unit 5',
      city: 'Newberg',
      state: 'OR'
    };

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.create = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const updateTableData = jest.fn();
    const showCreateVenue = jest.fn();
    const onClose = jest.fn();

    // Here we simulate adding the listing based on mock data
    await add(mockData, onClose, showCreateVenue, updateTableData);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.create).toHaveBeenCalledWith(mockData);

    // Verify that the getTableData and onClose functions were called
    expect(updateTableData).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('should call CreateNewVenue and create a new venue with no address1', async () => {
    const mockData = {
      name: 'test Venue',
      summary: 'Summary of Venue',
      type: 'Stadium',
      address1: '',
      address2: 'Unit 5',
      city: 'Newberg',
      state: 'OR'
    };

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.create = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const updateTableData = jest.fn();
    const showCreateVenue = jest.fn();
    const onClose = jest.fn();

    // Here we simulate adding the listing based on mock data
    await add(mockData, onClose, showCreateVenue, updateTableData);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.create).toHaveBeenCalledWith(mockData);

    // Verify that the getTableData and onClose functions were called
    expect(updateTableData).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('should call CreateNewVenue and create a new venue with no address2', async () => {
    const mockData = {
      name: 'test Venue',
      summary: 'Summary of Venue',
      type: 'Stadium',
      address1: '404 Main St',
      address2: '',
      city: 'Newberg',
      state: 'OR'
    };

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.create = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const updateTableData = jest.fn();
    const showCreateVenue = jest.fn();
    const onClose = jest.fn();

    // Here we simulate adding the listing based on mock data
    await add(mockData, onClose, showCreateVenue, updateTableData);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.create).toHaveBeenCalledWith(mockData);

    // Verify that the getTableData and onClose functions were called
    expect(updateTableData).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('should call CreateNewVenue and create a new venue with no city', async () => {
    const mockData = {
      name: 'test Venue',
      summary: 'Summary of Venue',
      type: 'Stadium',
      address1: '404 Main St',
      address2: 'Unit 5',
      city: '',
      state: 'OR'
    };

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.create = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const updateTableData = jest.fn();
    const showCreateVenue = jest.fn();
    const onClose = jest.fn();

    // Here we simulate adding the listing based on mock data
    await add(mockData, onClose, showCreateVenue, updateTableData);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.create).toHaveBeenCalledWith(mockData);

    // Verify that the getTableData and onClose functions were called
    expect(updateTableData).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('should call CreateNewVenue and create a new venue with no state', async () => {
    const mockData = {
      name: 'test Venue',
      summary: 'Summary of Venue',
      type: 'Stadium',
      address1: '404 Main St',
      address2: 'Unit 5',
      city: 'Newberg',
      state: ''
    };

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.create = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const updateTableData = jest.fn();
    const showCreateVenue = jest.fn();
    const onClose = jest.fn();

    // Here we simulate adding the listing based on mock data
    await add(mockData, onClose, showCreateVenue, updateTableData);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.create).toHaveBeenCalledWith(mockData);

    // Verify that the getTableData and onClose functions were called
    expect(updateTableData).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('should call CreateNewvenue with no name', async () => {
    const mockData = {
      name: '',
      summary: 'Summary of Venue',
      type: 'Stadium',
      address1: '404 Main St',
      address2: 'Unit 5',
      city: 'Newberg',
      state: ''
    };

    // Mock the API.edit method
    API.prototype.create = jest.fn().mockResolvedValue(true);

    // Mock other functions
    const updateTableData = jest.fn();
    const showCreateVenue = jest.fn();
    const onClose = jest.fn();

    // Here we simulate adding the listing based on mock data
    await add(mockData, onClose, showCreateVenue, updateTableData);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.create).toHaveBeenCalledTimes(0);

    // Verify that the getTableData and onClose functions were called
    expect(updateTableData).toHaveBeenCalledTimes(0);
    expect(onClose).toHaveBeenCalledTimes(0);
  });

});