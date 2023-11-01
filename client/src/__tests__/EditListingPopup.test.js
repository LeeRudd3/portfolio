import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'

import EditListingPopup from '../EditListingPopup'; // Adjust the path to your component
import API from '../API/API.js'; // Adjust the path to your API file

describe('EditListingPopup', () => {
  it('should call editListing and update data on button click', async () => {
    const mockData = {
      _id: 'listingId',
      name: 'Listing Name',
      summary: 'Listing Summary',
      bedrooms: '3',
      bathrooms: '2',
    };

    // Mock the API.edit method
    API.prototype.edit = jest.fn().mockResolvedValue(true);

    const getTableData = jest.fn();
    const onClose = jest.fn();

    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <EditListingPopup data={mockData} getTableData={getTableData} onClose={onClose} />
    );

    const nameInput = getByPlaceholderText('Listing Name');
    const summaryTextarea = getByPlaceholderText('Listing Summary');
    const bedroomsInput = getByPlaceholderText('3');
    const bathroomsInput = getByPlaceholderText('2');

    // Simulate editing the input fields
    fireEvent.change(nameInput, { target: { value: 'New Name' } });
    fireEvent.change(summaryTextarea, { target: { value: 'New Summary' } });
    fireEvent.change(bedroomsInput, { target: { value: '4' } });
    fireEvent.change(bathroomsInput, { target: { value: '3' } });

    // Simulate clicking the Update button
    const updateButton = getByText('Update');
    fireEvent.click(updateButton);

    // Wait for the API call to resolve
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.edit).toHaveBeenCalledWith('listingId', {
      name: 'New Name',
      summary: 'New Summary',
      bedrooms: '4',
      bathrooms: '3',
    });

    // Verify that the getTableData and onClose functions were called
    expect(getTableData).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();

    // Verify that the input fields are updated with the new values
    expect(getByDisplayValue('New Name')).toBeTruthy();
    expect(getByDisplayValue('New Summary')).toBeTruthy();
    expect(getByDisplayValue('4')).toBeTruthy();
    expect(getByDisplayValue('3')).toBeTruthy();
  });

  it('should not call editListing and update data on close button click', async () => {
    const mockData = {
      _id: 'listingId',
      name: 'Listing Name',
      summary: 'Listing Summary',
      bedrooms: '3',
      bathrooms: '2',
    };

    // Mock the API.edit method
    API.prototype.edit = jest.fn().mockResolvedValue(true);

    const getTableData = jest.fn();
    const onClose = jest.fn();

    const { getByTestId, getByText, getByPlaceholderText, getByDisplayValue } = render(
      <EditListingPopup data={mockData} getTableData={getTableData} onClose={onClose} />
    );

    const nameInput = getByPlaceholderText('Listing Name');
    const summaryTextarea = getByPlaceholderText('Listing Summary');
    const bedroomsInput = getByPlaceholderText('3');
    const bathroomsInput = getByPlaceholderText('2');

    // Simulate editing the input fields
    fireEvent.change(nameInput, { target: { value: 'New Name' } });
    fireEvent.change(summaryTextarea, { target: { value: 'New Summary' } });
    fireEvent.change(bedroomsInput, { target: { value: '4' } });
    fireEvent.change(bathroomsInput, { target: { value: '3' } });

    // Simulate clicking the Update button
    const closeButton = getByText('Close');
    
    fireEvent.click(closeButton);

    // Wait for the API call to resolve
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.edit).not.toHaveBeenCalledWith('listingId', {
      name: 'New Name',
      summary: 'New Summary',
      bedrooms: '4',
      bathrooms: '3',
    });

    // Verify that the getTableData and onClose functions were called
    expect(getTableData).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});