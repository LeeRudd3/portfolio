import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'

import EditVenuePopup from '../../../Components/Venue/EditVenuePopup.jsx'; // Adjust the path to your component
import API from '../../../Components/App/API/API.js'; // Adjust the path to your API file

describe('EditVenuePopup', () => {
  it('should call editVenue and update data on button click', async () => {
    const mockData = {
      _id: 'listingId',
      name: 'test Venue',
      summary: 'Summary of Venue',
      type: 'Stadium',
      address1: '404 Main St',
      address2: 'Unit 5',
      city: 'Portland',
      state: 'OR'
    };

    const newData = {
      _id: 'listingId',
      name: 'New Name',
      summary: 'New Summary',
      type: 'Field',
      address1: '555 First St',
      address2: 'Suite 777',
      city: 'Eugene',
      state: 'OR'
    };

    // Mock the API.edit method
    API.prototype.edit = jest.fn().mockResolvedValue(true);

    const getTableData = jest.fn();
    const onClose = jest.fn();

    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <EditVenuePopup data={mockData} getTableData={getTableData} onClose={onClose} />
    );

    const nameInput = getByPlaceholderText(mockData.name);
    const summaryTextarea = getByPlaceholderText(mockData.summary);
    const typeInput = getByPlaceholderText(mockData.type);
    const address1Input = getByPlaceholderText(mockData.address1);
    const address2Input = getByPlaceholderText(mockData.address2);
    const cityInput = getByPlaceholderText(mockData.city);
    const stateInput = getByPlaceholderText(mockData.state);

    // Simulate editing the input fields
    fireEvent.change(nameInput, { target: { value: newData.name } });
    fireEvent.change(summaryTextarea, { target: { value: newData.summary } });
    fireEvent.change(typeInput, { target: { value: newData.type } });
    fireEvent.change(address1Input, { target: { value: newData.address1 } });
    fireEvent.change(address2Input, { target: { value: newData.address2 } });
    fireEvent.change(cityInput, { target: { value: newData.city } });
    fireEvent.change(stateInput, { target: { value: newData.state } });

    // Simulate clicking the Update button
    const updateButton = getByText('Update');
    fireEvent.click(updateButton);

    // Wait for the API call to resolve
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.edit).toHaveBeenCalledWith('listingId', {
      name: newData.name,
      summary: newData.summary,
      type: newData.type,
      address1: newData.address1,
      address2: newData.address2,
      city: newData.city,
      state: newData.state
    });

    // Verify that the getTableData and onClose functions were called
    expect(getTableData).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();

    // Verify that the input fields are updated with the new values
    expect(getByDisplayValue(newData.name)).toBeTruthy();
    expect(getByDisplayValue(newData.summary)).toBeTruthy();
    expect(getByDisplayValue(newData.type)).toBeTruthy();
    expect(getByDisplayValue(newData.address1)).toBeTruthy();
    expect(getByDisplayValue(newData.address2)).toBeTruthy();
    expect(getByDisplayValue(newData.city)).toBeTruthy();
    expect(getByDisplayValue(newData.state)).toBeTruthy();
  });

  it('should not call editVenue and update data on close button click', async () => {
    const mockData = {
      _id: 'listingId',
      name: 'test Venue',
      summary: 'Summary of Venue',
      type: 'Stadium',
      address1: '404 Main St',
      address2: 'Unit 5',
      city: 'Portland',
      state: 'OR'
    };

    const newData = {
      _id: 'listingId',
      name: 'New Name',
      summary: 'New Summary',
      type: 'Field',
      address1: '555 First St',
      address2: 'Suite 777',
      city: 'Eugene',
      state: 'OR'
    };

    // Mock the API.edit method
    API.prototype.edit = jest.fn().mockResolvedValue(true);

    const getTableData = jest.fn();
    const onClose = jest.fn();

    const { getByTestId, getByText, getByPlaceholderText, getByDisplayValue } = render(
      <EditVenuePopup data={mockData} getTableData={getTableData} onClose={onClose} />
    );

    const nameInput = getByPlaceholderText(mockData.name);
    const summaryTextarea = getByPlaceholderText(mockData.summary);
    const typeInput = getByPlaceholderText(mockData.type);
    const address1Input = getByPlaceholderText(mockData.address1);
    const address2Input = getByPlaceholderText(mockData.address2);
    const cityInput = getByPlaceholderText(mockData.city);
    const stateInput = getByPlaceholderText(mockData.state);

    // Simulate editing the input fields
    fireEvent.change(nameInput, { target: { value: newData.name } });
    fireEvent.change(summaryTextarea, { target: { value: newData.summary } });
    fireEvent.change(typeInput, { target: { value: newData.type } });
    fireEvent.change(address1Input, { target: { value: newData.address1 } });
    fireEvent.change(address2Input, { target: { value: newData.address2 } });
    fireEvent.change(cityInput, { target: { value: newData.city } });
    fireEvent.change(stateInput, { target: { value: newData.state } });

    // Simulate clicking the Update button
    const closeButton = getByText('Close');
    
    fireEvent.click(closeButton);

    // Wait for the API call to resolve
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.edit).not.toHaveBeenCalledWith('listingId', {
      name: newData.name,
      summary: newData.summary,
      type: newData.type,
      address1: newData.address1,
      address2: newData.address2,
      city: newData.city,
      state: newData.state
    });

    // Verify that the getTableData and onClose functions were called
    expect(getTableData).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});