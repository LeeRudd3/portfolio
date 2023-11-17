import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'

import CreateNewListing from '../CreateNewListing'; 
import API from '../API/API'; 

describe('CreateNewListing', () => {
    
  const add = async (mockData, onClose, showCreateListing, updateTableData) => {
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <CreateNewListing onClose={onClose} showCreateListing={showCreateListing} updateTableData={updateTableData}/>
    );

    const nameInput = getByPlaceholderText('Enter name');
    const summaryTextarea = getByPlaceholderText('Enter summary');
    const bedroomsInput = getByPlaceholderText('Enter # of Bedrooms');
    const bathroomsInput = getByPlaceholderText('Enter # of Bathrooms');

    // Simulate editing the input fields
    fireEvent.change(nameInput, { target: { value: mockData['name'] } });
    fireEvent.change(summaryTextarea, { target: { value: mockData['summary'] } });
    fireEvent.change(bedroomsInput, { target: { value: mockData['bedrooms'] } });
    fireEvent.change(bathroomsInput, { target: { value: mockData['bathrooms'] } });

    // Simulate clicking the Update button
    const addButton = getByText('Add Listing');
    fireEvent.click(addButton);

    // Wait for the API call to resolve
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });
  };

  it('should call CreateNewListing and create a new listing on button click', async () => {
    const mockData = {
      name: 'Listing Name',
      summary: 'Listing Summary',
      bedrooms: '3',
      bathrooms: '2',
    };

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.create = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const updateTableData = jest.fn();
    const showCreateListing = jest.fn();
    const onClose = jest.fn();

    // Here we simulate adding the listing based on mock data
    await add(mockData, onClose, showCreateListing, updateTableData);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.create).toHaveBeenCalledWith(mockData);

    // Verify that the getTableData and onClose functions were called
    expect(updateTableData).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('should call CreateNewListing and create a new listing with no summary', async () => {
    const mockData = {
      name: 'Listing Name',
      summary: '',
      bedrooms: '3',
      bathrooms: '2',
    };

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.create = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const updateTableData = jest.fn();
    const showCreateListing = jest.fn();
    const onClose = jest.fn();

    // Here we simulate adding the listing based on mock data
    await add(mockData, onClose, showCreateListing, updateTableData);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.create).toHaveBeenCalledWith(mockData);

    // Verify that the getTableData and onClose functions were called
    expect(updateTableData).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('should call CreateNewListing and create a new listing with no bedroom', async () => {
    const mockData = {
      name: 'Listing Name',
      summary: 'Listing Summary',
      bedrooms: '',
      bathrooms: '2',
    };

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.create = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const updateTableData = jest.fn();
    const showCreateListing = jest.fn();
    const onClose = jest.fn();

    // Here we simulate adding the listing based on mock data
    await add(mockData, onClose, showCreateListing, updateTableData);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.create).toHaveBeenCalledWith(mockData);

    // Verify that the getTableData and onClose functions were called
    expect(updateTableData).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('should call CreateNewListing and create a new listing with no bathroom', async () => {
    const mockData = {
      name: 'Listing Name',
      summary: 'Listing Summary',
      bedrooms: '3',
      bathrooms: '',
    };

    const returnMockData = {
      _id: '111222333',
    };

    // Mock the API.edit method
    API.prototype.create = jest.fn().mockResolvedValue(returnMockData);

    // Mock other functions
    const updateTableData = jest.fn();
    const showCreateListing = jest.fn();
    const onClose = jest.fn();

    // Here we simulate adding the listing based on mock data
    await add(mockData, onClose, showCreateListing, updateTableData);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.create).toHaveBeenCalledWith(mockData);

    // Verify that the getTableData and onClose functions were called
    expect(updateTableData).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });



  it('should call CreateNewListing with no name', async () => {
    const mockData = {
      name: '',
      summary: 'Listing Summary',
      bedrooms: '3',
      bathrooms: '2',
    };

    // Mock the API.edit method
    API.prototype.create = jest.fn().mockResolvedValue(true);

    // Mock other functions
    const updateTableData = jest.fn();
    const showCreateListing = jest.fn();
    const onClose = jest.fn();

    // Here we simulate adding the listing based on mock data
    await add(mockData, onClose, showCreateListing, updateTableData);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.create).toHaveBeenCalledTimes(0);

    // Verify that the getTableData and onClose functions were called
    expect(updateTableData).toHaveBeenCalledTimes(0);
    expect(onClose).toHaveBeenCalledTimes(0);
  });

  it('should call CreateNewListing with Invalid Bedrooms', async () => {
    const mockData = {
      name: 'Invalid Bedroom',
      summary: 'Listing Summary',
      bedrooms: '3c',
      bathrooms: '2',
    };

    // Mock the API.edit method
    API.prototype.create = jest.fn().mockResolvedValue(true);

    // Mock other functions
    const updateTableData = jest.fn();
    const showCreateListing = jest.fn();
    const onClose = jest.fn();

    // Here we simulate adding the listing based on mock data
    await add(mockData, onClose, showCreateListing, updateTableData);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.create).toHaveBeenCalledTimes(0);

    // Verify that the getTableData and onClose functions were called
    expect(updateTableData).toHaveBeenCalledTimes(0);
    expect(onClose).toHaveBeenCalledTimes(0);
  });

  it('should call CreateNewListing with Invalid Bathrooms', async () => {
    const mockData = {
      name: 'Invalid Bedroom',
      summary: 'Listing Summary',
      bedrooms: '3',
      bathrooms: '2c',
    };

    // Mock the API.edit method
    API.prototype.create = jest.fn().mockResolvedValue(true);

    // Mock other functions
    const updateTableData = jest.fn();
    const showCreateListing = jest.fn();
    const onClose = jest.fn();

    // Here we simulate adding the listing based on mock data
    await add(mockData, onClose, showCreateListing, updateTableData);

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.create).toHaveBeenCalledTimes(0);

    // Verify that the getTableData and onClose functions were called
    expect(updateTableData).toHaveBeenCalledTimes(0);
    expect(onClose).toHaveBeenCalledTimes(0);
  });

});